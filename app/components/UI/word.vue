<script setup lang="ts">
defineProps<{
	word: string;
	score: number;
    selected:boolean
}>();
</script>
<template>
	<button
		:class="selected ? 'bg-gray-700' : 'bg-gray-800'"
		class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
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
