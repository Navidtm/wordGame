<script setup lang="ts">
import { chunk } from 'es-toolkit';

const maxResults = ref(12);
const aspect = ref<[number, number]>([4, 4]);
const chars = ref(Array(aspect.value[0] * aspect.value[1]).fill(''));
const cellCount = computed(() => aspect.value[0] * aspect.value[1]);

const words = computed(() => {
	if (chars.value.some((char) => !char)) return [];
	const result = searchWordsInGrid(chunk(chars.value, aspect.value[0]));
	return result.slice(0, maxResults.value);
});

const selected = ref(0);
const path = computed(() => words.value?.[selected.value]?.path);

const submit = () => path.value?.forEach((n) => (chars.value[n] = ''));

onKeyStroke(['Control'], () => chars.value.fill(''));
watch(aspect, () => {
	chars.value = Array(cellCount.value).fill('');
	selected.value = 0;
});

watch(words, (value) => {
	selected.value = value.length
		? Math.min(selected.value, value.length - 1)
		: 0;
});
</script>
<template>
	<div class="flex items-center justify-center flex-col h-dvh gap-3 p-4">
		<div
			class="border-px border-white/20 rounded-md w-full max-w-xl p-4 relative flex flex-col justify-between bg-[#111312]"
		>
			<div class="absolute top-4 left-4 text-xs p-1 flex gap-4">
				<Settings
					v-model:aspect="aspect"
					v-model:max-results="maxResults"
				/>
				<Icon
					class="cursor-pointer hover:opacity-80 transition-all"
					name="lucide:refresh-ccw"
					size="18"
					@click="chars.fill('')"
				/>
			</div>

			<div class="h-10"></div>

			<FieldTable
				v-model="chars"
				:aspect
				:path
			/>
			<WordTable
				v-model="selected"
				:words
				@submit="submit"
			/>
			<div class="h-10"></div>
		</div>
	</div>
</template>
