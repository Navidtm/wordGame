<script setup lang="ts">
import { range } from 'es-toolkit';

const letters = defineModel<string[]>({ required: true });

const { path } = defineProps<{ path: number[] }>();

const inputs = useTemplateRef('inputs');

const parseInput = (n: number) => {
	const char = letters.value[n]!;
	if (persianMap[char]) letters.value[n] = persianMap[char];

	if (!/[ا-ی]/.test(letters.value[n]!)) letters.value[n] = '';
};

const deleteChar = (n: number) => (letters.value[n] = '');

onMounted(() => inputs.value?.[0]?.focus());

watch(letters.value, (v) => {
	const idx = v.indexOf('');
	if (idx >= 0) inputs.value?.[idx]?.focus();
});

onKeyStroke(['Control'], () => letters.value.fill(''));
onKeyStroke(['Enter'], () => path.forEach(deleteChar));
</script>
<template>
	<div
		class="grid grid-cols-4 bg-primary/60 rounded-lg p-4 gap-2 w-fit mx-auto"
	>
		<input
			v-for="n in range(16)"
			v-model="letters[n]"
			ref="inputs"
			ref_for
			:key="n"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80"
			:class="path.includes(n) && letters[n] ? 'bg-gray-700' : 'bg-gray-800'"
			maxlength="1"
			@click="deleteChar(n)"
			@keyup.delete="deleteChar(letters[n] ? n : n - 1)"
			@input="nextTick(() => parseInput(n))"
		/>
	</div>
</template>
