<template>
	<div
		class="flex items-center justify-center flex-col py-12 h-dvh gap-3 text-white"
	>
		<div class="grid grid-cols-4 bg-primary/60 rounded-md p-2 gap-2">
			<input
				v-for="n in range(16)"
				v-model="letters[n]"
				ref="inputs"
				ref_for
				:key="n"
				class="rounded-md border border-black/30 w-14 h-12 text-center transition-all"
				:class="
					path[0] == n
						? 'bg-gray-400'
						: path.includes(n)
							? 'bg-gray-500'
							: 'bg-gray-600'
				"
				maxlength="1"
				@click="deleteWord([n])"
				@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
				@input="nextTick(() => focusInput(letters.indexOf('')))"
			/>
		</div>
		<div class="w-full max-w-62">
			<button
				class="w-full block bg-red-700 rounded-md py-2 hover:bg-red-600 transition-all cursor-pointer"
				@click="deleteWord(range(16))"
			>
				پاک
			</button>
		</div>
		<div class="grid grid-cols-3 gap-2">
			<button
				v-for="([word, p, score], i) in words"
				:key="word"
				:class="isEqual(path, p) ? 'bg-gray-800' : 'bg-gray-700'"
				@click="isEqual(path, p) ? deleteWord(p) : (focusedButton = i)"
				class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer"
			>
				{{ word }}
				<div :color="scoreToColor(score)">{{ score }}</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { isEqual, range } from 'es-toolkit';

const inputs = useTemplateRef('inputs');

const letters = ref<string[]>(Array(16).fill(''));
const focusedButton = ref(0);

const words = computed(() => findWords(letters.value));
const path = computed(() => words.value[focusedButton.value]?.[1] ?? []);

const focusInput = (n: number) => {
	inputs.value?.[n]?.focus();
};

const deleteWord = (p: number[]) => {
	p.forEach((n) => (letters.value[n] = ''));
	focusedButton.value = 0;
	focusInput(Math.min(...p));
};

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(path.value));
onKeyStroke(['Shift'], () => focusedButton.value++);

onMounted(() => focusInput(0));
</script>
