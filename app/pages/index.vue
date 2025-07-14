<template>
  <div class="flex max-w-lg mx-auto justify-around p-12 items-center gap-4 flex-col">
    <div class="">
      <div
        ref="inputsEl"
        class="grid grid-cols-4 mb-2"
      >
        <UInput
          v-for="(_, n) in 16"
          :key="n"
          class="max-w-15 p-1 rounded-md"
          v-model="letters[n]"
          color="info"
          maxlength="1"
          @click="letters[n] = ''"
          @keyup.delete="onDelete(n)"
          @focus="focusInput(n)"
          @input="focusFirstEmptyInput()"
          size="xl"
          :class="{
            'bg-primary': selectedWord?.path.includes(n),
            'bg-secondary': selectedWord?.path[0] == n
          }"
        />
      </div>
      <div class="flex w-full *:w-full *:block *:text-center gap-6">
        <UButton @click="refresh()">تایید</UButton>
        <UButton
          color="error"
          @click="deleteAll()"
        >
          پاک
        </UButton>
      </div>
    </div>
    <CheckStatus
      :status
      @refresh="refresh"
    >
      <div
        class="grid grid-cols-4 gap-2"
        ref="buttonsEl"
      >
        <template v-if="data">
          <UButton
            v-for="{ score, word, path } in data.words.slice(0, 20)"
            :key="word"
            :color="selectedWord?.word == word ? 'secondary' : 'primary'"
            @focus="selectedWord = { score, word, path }"
            @click="deleteWord()"
          >
            {{ word }} - {{ score }}
          </UButton>
        </template>
      </div>
    </CheckStatus>
  </div>
</template>

<script setup lang="ts">
import { range } from 'es-toolkit';

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');
const buttonsRef = useTemplateRef<HTMLDivElement>('buttonsEl');

const selectedWord = ref<Word | null>();
const letters = ref<string[]>(new Array(16).fill(''));

const { data, status, refresh, clear } = useFetch<APIWordRes>('/api/word', {
  query: { letters },
  watch: false,
  immediate: false
});

const focusInput = (n: number) =>
  (inputsRef.value?.children.item(n)?.firstChild as HTMLInputElement).focus();

const focusButton = (n: number) =>
  (buttonsRef.value?.children.item(n) as HTMLButtonElement).focus();

const focusFirstEmptyInput = () => {
  nextTick(() => {
    const firstIndex = letters.value.findIndex((v) => v == '');
    firstIndex >= 0 ? focusInput(firstIndex) : refresh();
  });
};

const deleteAll = () => {
  letters.value.fill('');
  selectedWord.value = null;
  clear();
  focusInput(0);
};

const onDelete = (n: number) => {
  if (n == 0) return;
  if (!letters.value[n]) letters.value[n - 1] = '';
  focusInput(n - 1);
};

const deleteWord = () => {
  selectedWord.value!.path.forEach((v) => (letters.value[v] = ''));
  focusFirstEmptyInput();
  selectedWord.value = null;
};

onKeyStroke(['Escape'], () => deleteAll());

onKeyStroke(range(20).map(String), (e) => {
  focusButton(+e.key);
});
</script>
