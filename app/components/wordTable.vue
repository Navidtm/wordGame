<script setup lang="ts">
const selectedWord = defineModel<Word | null>();

const emit = defineEmits<{
  deleteWord: [];
}>();

defineProps<{
  words: Word[];
}>();
</script>

<template>
  <div class="grid grid-cols-4 gap-2.5">
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
</template>
