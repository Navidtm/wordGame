<script setup lang="ts">
const selected = ref(0);
const letters = ref<string[]>(Array(16).fill(''));
const words = computed(() => findWords(letters.value));
const path = computed(() => words.value[selected.value]?.path ?? []);

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

const select = () => (i: number) =>
	selected.value == i ? deleteWord(path.value) : (selected.value = i);

watch(letters.value, () => (selected.value = 0));

onKeyStroke(['Shift'], () => selected.value++);
onKeyStroke(['Control'], () => deleteWord(table));
onKeyStroke(['Enter'], () => deleteWord(path.value));
</script>
<template>
	<Box>
		<Reload
			v-if="letters.some(Boolean)"
			@click="deleteWord(table)"
		/>
		<FieldTable
			v-model="letters"
			:path
			@delete="deleteWord"
		/>
		<WordTable
			:selected
			:words
			@select="select"
		/>
	</Box>
</template>
