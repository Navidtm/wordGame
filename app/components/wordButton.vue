<script setup lang="ts">
const { word: w, selected } = defineProps<{ word: Word; selected: boolean }>();
const { score, word } = toRefs(w);
</script>
<template>
	<button
		class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
		:class="selected ? 'bg-gray-700' : 'bg-gray-800'"
	>
		{{ word }}
		<div
			:class="score > 6 ? 'bg-green-600' : 'bg-yellow-600'"
			class="pt-1 px-2 rounded-md"
		>
			{{ score }}
		</div>
	</button>
</template>
