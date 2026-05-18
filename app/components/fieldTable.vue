<script setup lang="ts">
const props = defineProps<{ path: number[]; chars: string[] }>();
const emit = defineEmits<{ delete: [number[]]; insert: [string, number] }>();

const inputs = useTemplateRef('inputs');

const parseInput = (char: string, n: number) => {
	if (persianMap[char]) emit('insert', persianMap[char], n);
	if (!/[ا-ی]/.test(props.chars[n]!)) emit('insert', '', n);
};

const focus = (n: number) => inputs.value?.[n]?.focus();

onMounted(() => focus(0));
watch(props.chars, (v) => focus(v.indexOf('')));
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
			:value="chars[n]"
			@click="emit('delete', [n])"
			@keyup.delete="emit('delete', chars[n] ? [n] : [n - 1])"
			@input="({ data }) => parseInput(data!, n)"
		/>
	</div>
</template>
