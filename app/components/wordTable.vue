<script setup lang="ts">
const { words, selected } = defineProps<{ words: Word[]; selected: number }>();

const emit = defineEmits<{ select: [number] }>();
</script>

<template>
	<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4">
		<button
			v-for="({ word, score }, i) in words"
			:key="word"
			:class="selected == i ? 'bg-gray-700' : 'bg-gray-800'"
			class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
			@click="emit('select', i)"
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
