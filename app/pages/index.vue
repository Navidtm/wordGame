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
          @click="letters[n] = ''"
          @keyup.delete="onDelete(n)"
          @focus="focusInput(n)"
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
  query: {
    letters
  },
  watch: false,
  immediate: false
});

const focusInput = (n: number) => {
  const input = inputRefs.value?.children.item(n)?.children.item(0) as HTMLInputElement;
  input.focus();
  selectedWord.value = null;
};

const focusFirstEmptyInput = () => {
  const firstIndex = letters.value.findIndex((v) => v == '');
  firstIndex > 0 ? focusInput(firstIndex) : refresh();
};

const del = () => {
  letters.value = [];
  clear();
  focusInput(0);
};

const onDelete = (n: number) => {
  if (n == 0) return;

  letters.value[n] ? (letters.value[n] = '') : (letters.value[n - 1] = '');

  nextTick(() => {
    focusInput(n - 1);
  });
};

const nextInput = (n: number) => {
  nextTick(() => {
    if (letters.value[n]) {
      n == 15 ? refresh() : focusFirstEmptyInput();
    }
  });
};

const deleteWord = async () => {
  if (selectedWord.value) {
    selectedWord.value.path.forEach((v) => (letters.value[v] = ''));

    focusInput(selectedWord.value.path.sort((a, b) => a - b)[0] ?? 0);
  }
};
</script>
