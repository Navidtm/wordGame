<script setup lang="ts">
import { chunk, fill } from 'es-toolkit';

const maxResults = ref(12);
const aspect = ref<[number, number]>([4, 4]);
const chars = ref(fill(Array(aspect.value[0] * aspect.value[1]), ''));

const { data, execute, clear } = useFetch('/api/search', {
	onRequest: ({ options }) => {
		options.body = {
			grid: chunk(chars.value, aspect.value[0]),
			maxResults: 21,
		};
	},
	immediate: false,
	method: 'post',
	watch: false,
});

const words = computed(() => data.value?.words);

const selected = ref(0);

const submit = (path?: number[]) => {
	if (path) path.forEach((n) => (chars.value[n] = ''));
	else chars.value.fill('');
	selected.value = 0;
};
watch(chars.value, (v) => (v.indexOf('') == -1 ? execute() : clear()));
</script>
<template>
	<Box>
		<template #toolbar>
			<Settings
				v-model:aspect="aspect"
				v-model:max-results="maxResults"
			/>
			<Refresh @click="submit()" />
		</template>
		<FieldTable
			v-model="chars"
			:aspect
			:path="words?.[selected]?.path"
		/>
		<WordTable
			v-model="selected"
			:words="words?.slice(0, maxResults)"
			@submit="submit"
		/>
	</Box>
</template>
