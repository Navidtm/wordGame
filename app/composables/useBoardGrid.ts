import type { Ref } from 'vue';

export const useBoardGrid = (aspect: Ref<[number, number]>) => {
	const chars = ref<string[]>([]);
	const previousBoard = ref<string[] | null>(null);
	const canUndoClear = ref(false);
	let undoTimer: ReturnType<typeof setTimeout> | undefined;

	const cellCount = computed(() => aspect.value[0] * aspect.value[1]);
	const filledCells = computed(() => chars.value.filter(Boolean).length);
	const isComplete = computed(() => filledCells.value === cellCount.value);
	const progress = computed(() => `${(filledCells.value / cellCount.value) * 100}%`);

	const createEmptyBoard = () => Array<string>(cellCount.value).fill('');
	const dismissUndo = () => {
		previousBoard.value = null;
		canUndoClear.value = false;
		clearTimeout(undoTimer);
	};
	const resetBoard = () => {
		chars.value = createEmptyBoard();
	};
	const reset = () => {
		dismissUndo();
		resetBoard();
	};
	const clear = () => {
		previousBoard.value = [...chars.value];
		resetBoard();
		canUndoClear.value = true;
		clearTimeout(undoTimer);
		undoTimer = setTimeout(() => (canUndoClear.value = false), 5000);
	};
	const undoClear = () => {
		if (previousBoard.value?.length === cellCount.value) {
			chars.value = [...previousBoard.value];
		}
		dismissUndo();
	};
	const clearPath = (path: number[]) => {
		path.forEach(index => (chars.value[index] = ''));
	};

	watch(aspect, reset, { immediate: true });
	onScopeDispose(() => clearTimeout(undoTimer));

	return {
		chars,
		cellCount,
		filledCells,
		isComplete,
		progress,
		canUndoClear,
		reset,
		clear,
		undoClear,
		clearPath,
	};
};
