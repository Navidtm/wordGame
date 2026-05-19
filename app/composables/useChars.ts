import { chunk } from 'es-toolkit';

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

	const chars = ref<string[]>(
		Array(aspect.value[0] * aspect.value[1]).fill(''),
	);

	watch(chars.value, (v) => {
		if (v.indexOf('') == -1) execute();
		else clear();
	});

	const words = computed(() => data.value?.words ?? []);

	return { chars, words };
};
