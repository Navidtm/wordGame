import type { Ref } from 'vue';

import type { FoundWord } from '~/types/types';

export const usePathSelection = (words: Readonly<Ref<FoundWord[]>>) => {
	const selectedIndex = ref(0);
	const stepMode = ref(false);
	const pathStep = ref(0);
	const selectedPath = computed(() => words.value[selectedIndex.value]?.path ?? []);
	const displayedPath = computed(() =>
		stepMode.value ? selectedPath.value.slice(0, pathStep.value + 1) : selectedPath.value,
	);

	const select = (index: number) => {
		selectedIndex.value = index;
	};
	const toggleStepMode = () => {
		stepMode.value = !stepMode.value;
		pathStep.value = 0;
	};
	const moveStep = (amount: number) => {
		pathStep.value = Math.min(
			Math.max(0, pathStep.value + amount),
			Math.max(0, selectedPath.value.length - 1),
		);
	};

	watch(selectedIndex, () => (pathStep.value = 0));
	watch(words, results => {
		selectedIndex.value = results.length ? Math.min(selectedIndex.value, results.length - 1) : 0;
	});

	return {
		selectedIndex,
		stepMode,
		pathStep,
		selectedPath,
		displayedPath,
		select,
		toggleStepMode,
		moveStep,
	};
};
