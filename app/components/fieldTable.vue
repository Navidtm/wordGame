<script setup lang="ts">
import { range } from 'es-toolkit';

const path = defineModel<number[]>({ required: true });
const emit = defineEmits<{ find: [[string, number[], number][]] }>();

const letters = ref<string[]>(Array(16).fill(''));

const inputs = useTemplateRef('inputs');

const parseInput = (n: number) => {
	const char = letters.value[n]!;
	if (persianMap[char]) letters.value[n] = persianMap[char];

	if (!/[ا-ی]/.test(letters.value[n]!)) letters.value[n] = '';
};

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

onMounted(() => inputs.value?.[0]?.focus());

watch(letters.value, (v) => {
	const words = findWords(v);
	emit('find', words);

	if (v.indexOf('') >= 0) {
		path.value = [];
		inputs.value?.[v.indexOf('')]?.focus();
	} else {
		path.value = words[0]?.[1]!;
	}
});

watch(path, (v, o) => v.length == 0 && deleteWord(o));

onKeyStroke(['Control'], () => letters.value.fill(''));
onKeyStroke(['Enter'], () => deleteWord(path.value));
</script>
<template>
	<div
		class="grid grid-cols-4 bg-primary/60 rounded-lg p-4 gap-2 w-fit mx-auto"
	>
		<Reload
			v-if="letters.some(Boolean)"
			@click="letters.fill('')"
		/>
		<input
			v-for="n in range(16)"
			v-model="letters[n]"
			ref="inputs"
			ref_for
			:key="n"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80"
			:class="path.includes(n) && letters[n] ? 'bg-gray-700' : 'bg-gray-800'"
			maxlength="1"
			@click="deleteWord([n])"
			@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
			@input="nextTick(() => parseInput(n))"
		/>
	</div>
</template>
