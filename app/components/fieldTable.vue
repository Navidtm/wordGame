<script setup lang="ts">
const letters = defineModel<string[]>({ required: true });
const { path } = defineProps<{ path: number[] }>();
const emit = defineEmits<{ delete: [number[]] }>();

const inputs = useTemplateRef('inputs');

const parseInput = (n: number) => {
	const char = letters.value[n]!;
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
			v-model="letters[n]"
			ref="inputs"
			ref_for
			:key="n"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80"
			:class="path.includes(n) && letters[n] ? 'bg-gray-700' : 'bg-gray-800'"
			maxlength="1"
			@click="emit('delete', [n])"
			@keyup.delete="emit('delete', letters[n] ? [n] : [n - 1])"
			@input="nextTick(() => parseInput(n))"
		/>
	</div>
</template>
