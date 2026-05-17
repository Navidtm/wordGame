<script setup lang="ts">
import { isEqual, range, fill } from 'es-toolkit';

const letters = ref(fill(Array(16), ''));
const words = computed(() => findWords(letters.value));

const selectedButton = ref(0);
const path = computed(() => words.value[selectedButton.value]?.[1] ?? []);

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

watch(letters.value, (v) => {
	if (v.indexOf('') >= 0) selectedButton.value = 0;
});

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(path.value));
onKeyStroke(['Shift'], () => selectedButton.value++);
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
			<TextFields
				v-model="letters"
				:path
			/>
			<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4">
				<UIWord
					v-for="([word, p, score], i) in words"
					:key="word"
					@click="isEqual(path, p) ? deleteWord(p) : (selectedButton = i)"
					:word
					:score
					:selected="isEqual(path, p)"
				/>
			</div>
		</div>
	</div>
</template>
