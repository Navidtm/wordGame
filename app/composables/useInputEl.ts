import type { ShallowRef } from 'vue';

export const useInputEl = (
	inputs: Readonly<ShallowRef<HTMLInputElement[] | null>>,
	chars: Ref<string[]>,
) => {
	const parseInput = (n: number, data: string | null): void => {
		if (!data) return;

		data = persianMap[data.toLowerCase()] ?? data;

		if (/[ا-ی]/.test(data)) chars.value[n] = data;
		else inputs.value![n]!.value = '';
	};

	const focus = (n: number): void => inputs.value?.[n]?.focus();
	onStartTyping(() => focus(0));

	watch(chars.value, (v) => focus(v!.indexOf('')));

	return { parseInput };
};
