import type { ShallowRef } from 'vue';

export const useInputEl = (
	inputs: Readonly<ShallowRef<HTMLInputElement[] | null>>,
	chars: Ref<string[]>,
) => {
	const parseInput = (n: number): void => {
		if (!inputs.value?.[n]?.value) return;

		let char = inputs.value?.[n]?.value;
		char = persianMap[char.toLowerCase()] ?? char;

		if (/[ا-ی]/.test(char)) chars.value[n] = char;
		else inputs.value![n]!.value = '';
		return;
	};

	const focus = (n: number): void => inputs.value?.[n]?.focus();
	onStartTyping(() => focus(0));

	watch(chars.value, (v) => focus(v!.indexOf('')));

	return { focus, parseInput, chars };
};
