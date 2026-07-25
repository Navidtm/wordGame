// export const useClipboard = () => {
// 	const copied = ref<string | null>(null);
// 	let timer: ReturnType<typeof setTimeout> | undefined;

// 	const copy = async (text: string, label: string) => {
// 		if (!text || !navigator.clipboard) return false;
// 		try {
// 			await navigator.clipboard.writeText(text);
// 			copied.value = label;
// 			clearTimeout(timer);
// 			timer = setTimeout(() => (copied.value = null), 1800);
// 			return true;
// 		} catch {
// 			return false;
// 		}
// 	};

// 	onScopeDispose(() => clearTimeout(timer));
// 	return { copied, copy };
// };
