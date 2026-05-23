<script setup lang="ts">
import { range } from 'es-toolkit';

const chars = defineModel<string[]>({ required: true });

const { path = [], aspect } = defineProps<{
	path?: number[];
	aspect: [number, number];
}>();

const inputs = useTemplateRef('inputs');

const parseInput = (char: string) =>
	/[ا-ی]/.test(char) ? char : persianMap[char.toLowerCase()] || '';

const focus = (n: number): void => inputs.value?.[n]?.focus();

onStartTyping(() => focus(0));
watch(chars.value, (v) => focus(v.indexOf('')));
</script>
<template>
	<div
		class="grid rounded-lg p-4 gap-2 w-fit mx-auto"
		:style="{ gridTemplateColumns: `repeat(${aspect[0]},1fr)` }"
	>
		<input
			v-for="n in range(aspect[0] * aspect[1])"
			:key="n"
			ref="inputs"
			ref_for
			v-model="chars[n]"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80 outline-none ring-3 ring-transparent focus:ring-sky-800"
			:class="path.includes(n) ? 'bg-gray-700' : 'bg-gray-800'"
			@keyup.delete="chars[chars[n] ? n : n - 1] = ''"
			@input="({ data }) => (chars[n] = parseInput(data ?? ''))"
		/>
	</div>
</template>
