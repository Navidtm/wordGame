<script setup lang="ts">
const selected = defineModel<number>({ required: true });
const { words } = defineProps<{ words?: Word[] }>();
const emit = defineEmits<{ submit: [number[]] }>();

const select = (path: number[]) => {
	emit('submit', path);
	return 0;
};

onKeyStroke(['Shift'], () => selected.value++);
onKeyStroke(['Enter'], () => select(words?.[selected.value]?.path!));
</script>
<template>
	<div
		class="grid grid-cols-3 px-4 gap-2 py-4 content-start h-60 mx-auto overflow-scroll"
	>
		<button
			v-for="({ word, path, score }, i) in words"
			:key="word"
			class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
			:class="selected == i ? 'bg-gray-700' : 'bg-gray-800'"
			@click="selected = selected == i ? select(path) : i"
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
