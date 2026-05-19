import type { ShallowRef } from 'vue';

export const useInputEl = (
	inputs: Readonly<ShallowRef<HTMLInputElement[] | null>>,
) => {
	const parseInput = (n: number): string => {
		if (!inputs.value?.[n]?.value) return '';

		let char = inputs.value?.[n]?.value;
		char = persianMap[char.toLowerCase()] ?? char;

		if (/[ا-ی]/.test(char)) return char;
		else inputs.value![n]!.value = '';
		return '';
	};

	const focus = (n: number): void => inputs.value?.[n]?.focus();

	return { focus, parseInput };
};
