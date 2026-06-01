<script setup lang="ts">
import { chunk, fill } from 'es-toolkit';

const maxResults = ref(12);
const aspect = ref<[number, number]>([4, 4]);
const chars = ref(fill(Array(aspect.value[0] * aspect.value[1]), ''));

const body = computed(() => ({
	grid: chunk(chars.value, aspect.value[0]),
	maxResults: 21,
}));

const words = asyncComputed(() =>
	chars.value.filter(Boolean).length == 16
		? searchWordsInGrid(body.value.grid, { ...body.value }).then((v) =>
				v.slice(0, maxResults.value),
			)
		: [],
);

const path = computed(() => words.value?.[selected.value]?.path);

const selected = ref(0);

const submit = () => path.value?.forEach((n) => (chars.value[n] = ''));
</script>
<template>
	<Box>
		<template #toolbar>
			<Settings
				v-model:aspect="aspect"
				v-model:max-results="maxResults"
			/>
			<Refresh @click="chars.fill('')" />
		</template>
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
	</Box>
</template>
