<script setup lang="ts">
import { range } from 'es-toolkit';

const aspect = ref<[number, number]>([4, 4]);
const selected = ref(0);

const { chars, deleteWord, insert } = useChars(aspect, {
	onDelete: () => {
		selected.value = 0;
		clear();
	},
	onFilled: async () => await execute(),
});

const { data, execute, clear } = await useFetch('/api/search', {
	onRequest: ({ options }) =>
		(options.body = { chars: chars.value, aspect: aspect.value }),
	immediate: false,
	method: 'post',
	watch: false,
	deep: true,
});

const path = computed(() => data.value?.words[selected.value]?.path ?? []);

const select = (i: number) =>
	selected.value == i ? deleteWord(path.value) : (selected.value = i);

onKeyStroke(['Shift'], () => selected.value++);
onKeyStroke(['Control'], () =>
	deleteWord(range(aspect.value[0] * aspect.value[1])),
);
onKeyStroke(['Enter'], () => deleteWord(path.value));
</script>
<template>
	<Box>
		<Reload
			v-if="chars.some(Boolean)"
			@click="deleteWord(range(aspect[0] * aspect[1]))"
		/>
		<FieldTable
			:aspect
			:chars
			:path
			@insert="insert"
			@delete="deleteWord"
		/>
		<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4">
			<WordButton
				v-for="(word, i) in data?.words"
				:key="word.word"
				:word
				:selected="selected == i"
				@click="select(i)"
			/>
		</div>
	</Box>
</template>
