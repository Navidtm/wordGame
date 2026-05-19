<script setup lang="ts">
const { words } = defineProps<{ words?: Word[] }>();
const emit = defineEmits<{ select: [number[]]; submit: [number[]] }>();

const selected = ref(0);
const select = (n: number) => {
	if (selected.value !== n) {
		selected.value = n;
		emit('select', words?.[n]?.path!);
	} else {
		selected.value = 0;
		emit('submit', words?.[n]?.path!);
	}
};

onMounted(() => emit('select', words?.[0]?.path!));

onKeyStroke(['Shift'], () => selected.value++);
</script>
<template>
	<div class="grid grid-cols-3 px-4 gap-2 py-4 content-center">
		<WordButton
			v-for="(word, i) in words"
			:key="word.word"
			:word
			:selected="selected == i"
			@click="() => select(i)"
		/>
	</div>
</template>
