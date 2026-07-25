<script setup lang="ts">
import { range } from 'es-toolkit';

const chars = defineModel<string[]>({ required: true });

const { path = [], aspect } = defineProps<{
	path?: number[];
	aspect: [number, number];
}>();

const inputs = useTemplateRef('inputs');

const parseInput = (value: string) => {
	const char = Array.from(value).at(-1) ?? '';
	const normalized = char.replace('ي', 'ی').replace('ك', 'ک');
	return /[آ-ی]/.test(normalized)
		? normalized
		: (persianMap.get(normalized.toLowerCase()) ?? '');
};

const focus = (n: number): void => inputs.value?.[n]?.focus();

const firstEmptyIndex = () => chars.value.indexOf('');

const handleInput = (index: number, event: Event) => {
	const input = event.target as HTMLInputElement;
	chars.value[index] = parseInput(input.value);
	input.value = chars.value[index]!;
	if (chars.value[index] && index < chars.value.length - 1)
		focus(firstEmptyIndex());
};

const handleBackspace = (index: number) => {
	if (chars.value[index]) {
		chars.value[index] = '';
		return;
	}
	if (index > 0) {
		chars.value[index - 1] = '';
		focus(index - 1);
	}
};

onStartTyping(() => focus(Math.max(0, firstEmptyIndex())));
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
			:value="chars[n]"
			maxlength="1"
			inputmode="text"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80 outline-none ring-3 ring-transparent focus:ring-sky-800"
			:class="path.includes(n) ? 'bg-gray-700' : 'bg-gray-800'"
			@input="handleInput(n, $event)"
			@keydown.backspace.prevent="handleBackspace(n)"
		/>
		<!-- @input="({ data }) => (chars[n] = parseInput(data ?? ''))" -->
	</div>
</template>
