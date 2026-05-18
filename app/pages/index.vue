<script setup lang="ts">
const selected = ref(0);
const letters = ref<string[]>(Array(16).fill(''));
const body = computed(() => ({ chars: letters.value }));

const { data, execute, clear } = await useFetch('/api/process', {
	body,
	immediate: false,
	method: 'post',
	watch: false,
	deep: true,
});

const path = computed(() => data.value?.words[selected.value]?.path ?? []);

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

const select = (i: number) =>
	selected.value == i ? deleteWord(path.value) : (selected.value = i);

watch(letters.value, async (v) => {
	if (v.indexOf('') >= 0) {
		selected.value = 0;
		clear();
	} else {
		await execute();
	}
});

onKeyStroke(['Shift'], () => selected.value++);
onKeyStroke(['Control'], () => deleteWord(table));
onKeyStroke(['Enter'], () => deleteWord(path.value));
</script>
<template>
	<Box>
		<Reload
			v-if="letters.some(Boolean)"
			@click="deleteWord(table)"
		/>
		<FieldTable
			v-model="letters"
			:path
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
