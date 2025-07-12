<template>
  <div class="flex justify-around p-12 items-center flex-col">
    <div class="">
      <div
        ref="inputsEl"
        class="grid grid-cols-4 mb-2"
      >
        <UInput
          v-for="(_, n) in 16"
          :key="n"
          v-model="letters[n]"
          color="info"
          maxlength="1"
          @keyup.delete="onDelete(n)"
          @focus="letters[n] ? nextInput(n) : {}"
          @input="nextInput(n)"
          size="xl"
          :class="{
            'bg-red-700': selectedWord?.path.includes(n),
            'bg-indigo-700': selectedWord?.path[0] == n
          }"
          class="max-w-15 p-1"
        />
      </div>
      <div class="flex w-full *:w-full *:block *:text-center gap-6">
        <UButton @click="refresh()">تایید</UButton>
        <UButton @click="del()">پاک</UButton>
      </div>
    </div>
    <WordTable
      v-if="data"
      v-model="selectedWord"
      :status
      :words="data.words.slice(0, 20)"
      @delete-word="deleteWord"
      @refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts">
import { delay } from 'es-toolkit';
import WordTable from '~/components/wordTable.vue';
import type { APIWordRes, Word } from '~~/shared/types/api/word.post';

const inputRefs = useTemplateRef<HTMLDivElement>('inputsEl');
const selectedWord = ref<Word | null>();
const letters = ref<string[]>([]);

const { data, status, refresh, clear } = useFetch<APIWordRes>('/api/word', {
  method: 'post',
  body: {
    letters
  },
  immediate: false
});

const focusInput = (n: number) => {
  (inputRefs.value?.children.item(n)?.children.item(0) as HTMLInputElement).focus();
};

const del = async () => {
  letters.value = [];
  selectedWord.value = null;
  clear();
  await delay(10);
  focusInput(0);
};

const onDelete = async (n: number) => {
  await delay(10);
  if (n > 0) {
    if (letters.value[n]) {
      letters.value[n] = '';
    } else {
      letters.value[n - 1] = '';
      await delay(10);
      focusInput(n - 1);
    }
  }
};

const nextInput = async (n: number) => {
  await delay(20);

  if (letters.value[n]) {
    n == 15 ? refresh() : focusInput(n + 1);
  }
};

const deleteWord = async () => {
  if (selectedWord.value) {
    selectedWord.value.path.forEach((v) => (letters.value[v] = ''));

    await delay(50);

    focusInput(selectedWord.value.path.sort((a, b) => a - b)[0] ?? 0);
    selectedWord.value = null;
  }
};
</script>
