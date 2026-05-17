<script setup lang="ts">
import { isEqual, range, fill } from 'es-toolkit';

const inputs = useTemplateRef('inputs');

const letters = ref(fill(Array(16), ''));
const focusedButton = ref(0);

const words = computed(() => findWords(letters.value));
const path = computed(() => words.value[focusedButton.value]?.[1] ?? []);

const focusInput = (n: number) => inputs.value?.[n]?.focus();

const deleteWord = (p: number[]) => {
	p.forEach((n) => (letters.value[n] = ''));
	focusedButton.value = 0;
	focusInput(Math.min(...p));
};

const convertToPersian = (n: number) => {
	const char = letters.value[n]!;
	if (persianMap[char]) letters.value[n] = persianMap[char];

	if (/[ا-ی]/.test(letters.value[n]!)) focusInput(letters.value.indexOf(''));
	else letters.value[n] = '';
};

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(path.value));
onKeyStroke(['Shift'], () => focusedButton.value++);

onMounted(() => focusInput(0));
</script>
<template>
	<div class="flex items-center justify-center flex-col py-12 h-dvh gap-3">
		<div class="grid grid-cols-4 bg-primary/60 rounded-md p-2 gap-2">
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
				@input="nextTick(() => convertToPersian(n))"
			/>
		</div>
		<div class="w-full max-w-62">
			<button
				class="w-full block bg-red-700/80 rounded-md py-2 hover:opacity-80 transition-all cursor-pointer"
				@click="deleteWord(range(16))"
			>
				پاک
			</button>
		</div>
		<div class="grid grid-cols-3 gap-2">
			<button
				v-for="([word, p, score], i) in words"
				:key="word"
				:class="isEqual(path, p) ? 'bg-gray-700' : 'bg-gray-800'"
				@click="isEqual(path, p) ? deleteWord(p) : (focusedButton = i)"
				class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
			>
				{{ word }}
				<div
					:class="score > 6 ? 'bg-green-600' : 'bg-yellow-600'"
					class="pt-1 px-2 rounded-md"
				>
					{{ score }}
				</div>
			</button>
		</div>
	</div>
</template>
