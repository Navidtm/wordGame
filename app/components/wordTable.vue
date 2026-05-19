<script setup lang="ts">
const selected = defineModel<number>({ required: true });
const { words } = defineProps<{ words?: Word[] }>();
const emit = defineEmits<{ submit: [] }>();

const select = (n: number) => {
	if (selected.value !== n) {
		selected.value = n;
	} else {
		emit('submit');
		selected.value = 0;
	}
};

onKeyStroke(['Shift'], () => selected.value++);
</script>
<template>
	<div class="grid grid-cols-3 px-4 gap-2 py-4 content-center">
		<button
			v-for="(word, i) in words"
			:key="word.word"
			class="flex justify-between w-full items-center gap-2 max-h-10 p-3 rounded-md transition-all text-sm cursor-pointer hover:opacity-80"
			:class="selected == i ? 'bg-gray-700' : 'bg-gray-800'"
			@click="() => select(i)"
		>
			{{ word.word }}
			<div
				:class="word.score > 6 ? 'bg-green-600' : 'bg-yellow-600'"
				class="pt-1 px-2 rounded-md"
			>
				{{ word.score }}
			</div>
		</button>
	</div>
</template>
