<template>
	<div class="flex items-center justify-center flex-col py-12 h-dvh gap-3">
		<div
			ref="inputsEl"
			class="grid grid-cols-4 bg-blue-500/60 rounded-xl p-1 gap-2"
		>
			<UInput
				v-for="n in range(16)"
				v-model="letters[n]"
				:key="n"
				size="xl"
				class="max-w-12 rounded-md border border-black"
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
				v-for="{ color, word, path: p, score } in findWords(letters)"
				:key="word"
				:color="isEqual(path, p) ? 'neutral' : 'primary'"
				@click="isEqual(path, p) ? deleteWord(p) : (path = p)"
				class="flex justify-between w-full items-center gap-2 max-h-10"
			>
				{{ word }}
				<UButton :color>
					{{ score }}
				</UButton>
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { isEqual, range } from 'es-toolkit';

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');

const path = ref<number[]>([]);
const letters = ref<string[]>(Array(16).fill(''));

const focusInput = (n: number) => {
	if (n < 0) path.value = findWords(letters.value)[0]?.path ?? [];
	else
		(inputsRef.value?.children.item(n)?.firstChild as HTMLInputElement).focus();
};

const deleteWord = (p: number[]) => {
	if (p.length == 0) return;
	p.forEach((n) => (letters.value[n] = ''));
	path.value = [];
	focusInput(Math.min(...p));
};

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(path.value));

onMounted(() => focusInput(0));
</script>
