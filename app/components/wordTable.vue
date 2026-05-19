<script setup lang="ts">
const { words } = defineProps<{ words?: Word[] }>();
const selected = defineModel<number>({ required: true });

onKeyStroke(['Shift'], () => selected.value++);
</script>
<template>
	<div class="grid grid-cols-3 px-4 gap-2 mx-auto pb-4 h-60 content-center">
		<WordButton
			v-for="(word, i) in words"
			:key="word.word"
			:word
			:selected="selected == i"
			@click="selected = i"
		/>
	</div>
</template>
