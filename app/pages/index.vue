<template>
	<div class="flex items-center justify-center flex-col py-12 h-dvh gap-3">
		<div class="grid grid-cols-4 bg-primary/60 rounded-md p-2 gap-2">
			<UInput
				v-for="n in range(16)"
				v-model="letters[n]"
				ref="inputs"
				ref_for
				:key="n"
				class="rounded-md border border-black/30 w-14 h-12 *:h-full text-center"
				maxlength="1"
				:variant="path[0] == n ? 'none' : path.includes(n) ? 'soft' : 'outline'"
				@click="deleteWord([n])"
				@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
				@input="nextTick(() => focusInput(letters.indexOf('')))"
			/>
		</div>
		<div class="w-full *:w-full *:block max-w-60">
			<UButton @click="deleteWord(range(16))">پاک</UButton>
		</div>
		<div class="grid grid-cols-3 gap-2 min-h-48">
			<UButton
				v-for="([word, p, score], i) in words"
				:key="word"
				:color="isEqual(path, p) ? 'neutral' : 'primary'"
				@click="isEqual(path, p) ? deleteWord(p) : (focusedButton = i)"
				class="flex justify-between w-full items-center gap-2 max-h-10"
			>
				{{ word }}
				<UButton :color="scoreToColor(score)">{{ score }}</UButton>
			</UButton>
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
	inputs.value?.[n]?.inputRef?.focus();
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
