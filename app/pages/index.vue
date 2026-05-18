<script setup lang="ts">
const selected = ref(0);

const { chars, deleteWord, insert } = useChars({
	onDelete: () => {
		selected.value = 0;
		clear();
	},
	onFilled: async () => await execute(),
});

const { data, execute, clear } = await useFetch('/api/process', {
	onRequest: ({ options }) => (options.body = { chars: chars.value }),
	immediate: false,
	method: 'post',
	watch: false,
	deep: true,
});

const path = computed(() => data.value?.words[selected.value]?.path ?? []);

const select = (i: number) =>
	selected.value == i ? deleteWord(path.value) : (selected.value = i);

onKeyStroke(['Shift'], () => selected.value++);
onKeyStroke(['Control'], () => deleteWord(table));
onKeyStroke(['Enter'], () => deleteWord(path.value));
</script>
<template>
	<Box>
		<Reload
			v-if="chars.some(Boolean)"
			@click="deleteWord(table)"
		/>
		<FieldTable
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
