<script setup lang="ts">
import { isEqual, range, fill } from 'es-toolkit';

const inputs = useTemplateRef('inputs');

const letters = ref(fill(Array(16), ''));
const focusedButton = ref(0);

const words = computed(() => findWords(letters.value));
const path = computed(() => words.value[focusedButton.value]?.[1] ?? []);

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

const parseInput = (n: number) => {
	const char = letters.value[n]!;
	if (persianMap[char]) letters.value[n] = persianMap[char];

	if (!/[ا-ی]/.test(letters.value[n]!)) letters.value[n] = '';
};

watch(
	letters.value,
	() => {
		const emptyLetterIdx = letters.value.indexOf('');
		if (emptyLetterIdx >= 0) {
			inputs.value?.[emptyLetterIdx]?.focus();
			focusedButton.value = 0;
		}
	},
	{ immediate: true },
);

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(path.value));
onKeyStroke(['Shift'], () => focusedButton.value++);
</script>
<template>
	<div class="flex items-center justify-center flex-col h-dvh gap-3">
		<div
			class="border-px border-white/20 rounded-md w-full max-w-xl relative flex flex-col justify-between bg-[#111312]"
		>
			<UIReload
				v-if="words.length"
				@click="deleteWord(range(16))"
			/>
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
					:class="path.includes(n) ? 'bg-gray-700' : 'bg-gray-800'"
					maxlength="1"
					@click="deleteWord([n])"
					@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
					@input="nextTick(() => parseInput(n))"
				/>
			</div>
			<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4">
				<UIWord
					v-for="([word, p, score], i) in words"
					:key="word"
					@click="isEqual(path, p) ? deleteWord(p) : (focusedButton = i)"
					:word
					:score
					:selected="isEqual(path, p)"
				/>
			</div>
		</div>
	</div>
</template>
