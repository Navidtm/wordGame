export const useChars = (
	aspect: Ref<[number, number]>,
	opsions?: {
		onDelete: () => void;
		onFilled: () => void;
	},
) => {
	const chars = ref<string[]>(
		Array(aspect.value[0] * aspect.value[1]).fill(''),
	);

	const deleteWord = (p: number[]) => {
		p.forEach((n) => (chars.value[n] = ''));
		opsions?.onDelete();
	};

	const insert = (char: string, i: number) => {
		chars.value[i] = char;
		if (chars.value.indexOf('') == -1) opsions?.onFilled();
	};

	return { chars, deleteWord, insert };
};
