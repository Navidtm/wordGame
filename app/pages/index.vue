<template>
  <div class="flex max-w-md mx-auto justify-around p-12 items-center gap-4 flex-col">
    <div class="">
      <div
        ref="inputsEl"
        class="grid grid-cols-4 mb-2"
      >
        <UInput
          v-for="(_, n) in 16"
          :key="n"
          class="max-w-15 p-1"
          v-model="letters[n]"
          color="info"
          maxlength="1"
          @click="letters[n] = ''"
          @keyup.delete="onDelete(n)"
          @focus="focusInput(n)"
          @input="focusFirstEmptyInput()"
          size="xl"
          :class="{
            'bg-red-700': selectedWord?.path.includes(n),
            'bg-indigo-700': selectedWord?.path[0] == n
          }"
        />
      </div>
      <div class="flex w-full *:w-full *:block *:text-center gap-6">
        <UButton @click="refresh()">تایید</UButton>
        <UButton @click="deleteAll()">پاک</UButton>
      </div>
    </div>
    <CheckStatus
      :status
      @refresh="refresh"
    >
      <WordTable
        v-if="data"
        v-model="selectedWord"
        :words="data.words.slice(0, 20)"
        @delete-word="deleteWord"
      />
    </CheckStatus>
  </div>
</template>

<script setup lang="ts">
import WordTable from '~/components/wordTable.vue';

const inputRefs = useTemplateRef<HTMLDivElement>('inputsEl');
const selectedWord = ref<Word | null>();
const letters = ref<string[]>(new Array(16).fill(''));

const { data, status, refresh, clear } = useFetch<APIWordRes>('/api/word', {
  query: { letters },
  watch: false,
  immediate: false
});

const focusInput = (n: number) => {
  const input = inputRefs.value?.children.item(n)?.firstChild as HTMLInputElement;
  input.focus();
};

const focusFirstEmptyInput = () => {
  nextTick(() => {
    const firstIndex = letters.value.findIndex((v) => v == '');
    firstIndex >= 0 ? focusInput(firstIndex) : refresh();
  });
};

const deleteAll = () => {
  letters.value = [];
  clear();
  focusInput(0);
};

const onDelete = (n: number) => {
  if (n == 0) return;
  if (!letters.value[n]) letters.value[n - 1] = '';
  focusInput(n - 1);
};

const deleteWord = async () => {
  selectedWord.value!.path.forEach((v) => (letters.value[v] = ''));
  focusFirstEmptyInput();
  selectedWord.value = null;
};
</script>
