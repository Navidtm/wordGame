<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);
const { chars, deleteChars, insert, words, selected } = useChars(aspect);
</script>
<template>
	<Box>
		<Refresh @click="deleteChars()" />
		<div class="h-60"></div>
		<FieldTable
			:aspect
			:chars
			:path="words?.[selected]?.path!"
			@insert="insert"
			@delete="deleteChars"
		/>
		<WordTable
			v-model="selected"
			:words
		/>
	</Box>
</template>
