<script setup lang="ts">
const path = defineModel<number[]>({ required: true });

const { letters } = defineProps<{ letters: string[] }>();
const words = computed(() => {
	if (letters.every(Boolean)) {
		const words = findWords(letters);
		path.value = words[0]?.[1]!;
		return words;
	}
});

const selected = ref(0);

const select = (i: number, p: number[]) => {
	if (selected.value == i) {
		selected.value = 0;
		path.value = [];
	} else {
		selected.value = i;
		path.value = p;
	}
};

watch(path, (v) => {
	if (!v.length) selected.value = 0;
});

onKeyStroke(['Shift'], () => selected.value++);
</script>

<template>
	<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4">
		<button
			v-for="([word, p, score], i) in words"
			:key="word"
			:class="selected == i ? 'bg-gray-700' : 'bg-gray-800'"
			class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
			@click="select(i, p)"
		>
			{{ word }}
			<div
				:class="score > 6 ? 'bg-green-600' : 'bg-yellow-600'"
				class="pt-1 px-2 rounded-md"
			>
				{{ score }}
			</div>
		</button>
	</div>
</template>
