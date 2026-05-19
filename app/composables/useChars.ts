import { chunk } from 'es-toolkit';

export const useChars = (aspect: Ref<[number, number]>) => {
	const selected = ref(0);

	watch(selected, (v, o) => v == o && deleteChars(words.value?.[v]?.path));

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

	const deleteChars = (p: number[] = []) => {
		if (!p.length) chars.value.fill('');
		else p.forEach((n) => (chars.value[n] = ''));
		selected.value = 0;
		clear();
	};

	const insert = (char: string, i: number) => {
		chars.value[i] = char;
		if (chars.value.indexOf('') == -1) execute();
	};

	const words = computed(() => data.value?.words);

	return { chars, deleteChars, insert, words, selected };
};
