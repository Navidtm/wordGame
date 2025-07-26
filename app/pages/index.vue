<template>
  <div class="flex max-w-xl mx-auto justify-around p-12 items-center gap-4 flex-col">
    <div class="">
      <div
        ref="inputsEl"
        class="grid grid-cols-4 mb-2"
      >
        <UInput
          v-for="n in range(16)"
          v-model="letters[n]"
          :key="n"
          size="xl"
          color="info"
          maxlength="1"
          class="max-w-15 p-1 rounded-md"
          :class="{ 'bg-primary': path.includes(n), 'bg-secondary': path[0] == n }"
          @click="letters[n] = ''"
          @keyup.delete="onDelete(n)"
          @focus="focusInput(n)"
          @input="focusFirstEmptyInput()"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-4 gap-2"
      ref="buttonsEl"
    >
      <template v-if="data">
        <UButton
          v-for="{ score, word, path: p } in data.slice(0, 20)"
          :key="word"
          :color="isEqual(path, p) ? colorButton(score) : 'primary'"
          @focus="path = p"
          @click="deleteWord()"
        >
          <div class="flex justify-between w-full items-center gap-2">
            {{ word }}
            <UButton
              size="sm"
              disabled
              :color="colorButton(score)"
            >
              {{ score }}
            </UButton>
          </div>
        </UButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { range, isEqual, sortBy, chunk } from 'es-toolkit';

export type Word = {
  word: string;
  score: number;
  path: number[];
};

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');
const buttonsRef = useTemplateRef<HTMLDivElement>('buttonsEl');

const path = ref<number[]>([]);
const letters = ref<string[]>(new Array(16).fill(''));

const data = ref<Word[]>([]);

const refresh = () => {
  const wordList = findWords(chunk(letters.value, 4));

  const sortedWordList = sortBy(wordList, ['score', ({ word }) => -word.length])
    .reverse()
    .slice(0, 50);

  data.value = sortedWordList;
};

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
  path.value = [];
  data.value = [];
  focusInput(0);
};

const onDelete = (n: number) => {
  if (n == 0) return;
  if (!letters.value[n]) letters.value[n - 1] = '';
  focusInput(n - 1);
};

const deleteWord = () => {
  path.value.forEach((v) => (letters.value[v] = ''));
  focusFirstEmptyInput();
  path.value = [];
};

onKeyStroke(['Escape'], () => deleteAll());
onKeyStroke(range(20).map(String), (e) => focusButton(+e.key));

onMounted(() => focusInput(0));

const colorButton = (score: number) => (score >= 7 ? 'success' : score >= 5 ? 'warning' : 'error');
</script>
