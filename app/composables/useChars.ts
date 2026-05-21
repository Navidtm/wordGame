import { chunk, fill } from 'es-toolkit';

export const useChars = (aspect: Ref<[number, number]>) => {
	const { data, execute, clear } = useFetch('/api/search', {
		onRequest: ({ options }) => {
			options.body = { grid: chunk(chars.value, aspect.value[0]) };
		},
		immediate: false,
		method: 'post',
		watch: false,
		deep: true,
	});

	const chars = ref(fill(Array(aspect.value[0] * aspect.value[1]), ''));

	watch(chars.value, (v) => (v.indexOf('') == -1 ? execute() : clear()));
	const words = computed(() => data.value?.words);

	return { chars, words };
};
