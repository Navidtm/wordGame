<script setup lang="ts">
import type { Word } from '~~/shared/types/api/word.post';

const selectedWord = defineModel<Word | null>();

const emit = defineEmits<{
  deleteWord: [];
  refresh: [];
}>();

const { status } = defineProps<{
  status: ReturnType<Awaited<typeof useFetch>>['status']['value'];
  words: Word[];
}>();
</script>

<template>
  <div class="max-w-lg">
    <div
      v-if="status == 'success'"
      class="grid grid-cols-4 gap-5 p-8"
    >
      <div
        v-for="{ score, word, path } in words"
        :key="word"
      >
        <div
          class=""
          @click="selectedWord = { score, word, path }"
          :class="selectedWord?.word == word ? 'text-red-700' : 'text-white'"
        >
          {{ word }} - {{ score }}
        </div>
      </div>
      <UButton
        v-if="selectedWord"
        @click="emit('deleteWord')"
      >
        پاک کن
      </UButton>
    </div>
    <div
      v-else-if="status == 'error'"
      class="text-center flex justify-center items-center gap-4"
    >
      <div class="">خطا</div>
      <UButton
        type="button"
        color="error"
        @click="emit('refresh')"
      >
        تلاش مچدد
      </UButton>
    </div>
  </div>
</template>
