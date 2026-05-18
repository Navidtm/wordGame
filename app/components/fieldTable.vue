<script setup lang="ts">
const letters = defineModel<string[]>({ required: true });
const { path } = defineProps<{ path: number[] }>();

const inputs = useTemplateRef('inputs');

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

const parseInput = (char: string, n: number) => {
	if (persianMap[char]) letters.value[n] = persianMap[char];
	if (!/[ا-ی]/.test(letters.value[n]!)) letters.value[n] = '';
};

const focus = (n: number) => inputs.value?.[n]?.focus();

onMounted(() => focus(0));
watch(letters.value, (v) => focus(v.indexOf('')));
</script>
<template>
	<div class="grid grid-cols-4 rounded-lg p-4 gap-2 w-fit mx-auto">
		<input
			v-for="n in table"
			:key="n"
			ref="inputs"
			ref_for
			maxlength="1"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80"
			:class="path.includes(n) ? 'bg-gray-700' : 'bg-gray-800'"
			:value="letters[n]"
			@click="deleteWord([n])"
			@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
			@input="({ data }) => parseInput(data!, n)"
		/>
	</div>
</template>
