<script setup lang="ts">
const selected = ref(0);
const aspect = ref<[number, number]>([4, 4]);

const { chars, data } = useChars(aspect);
</script>
<template>
	<Box>
		<Refresh @click="chars = []" />
		<div class="h-60"></div>
		<FieldTable
			v-model="chars"
			:aspect
			:path="data?.words[selected]?.path"
		/>
		<WordTable
			v-model="selected"
			:words="data?.words"
			@submit="(path) => path.forEach((n) => (chars[n] = ''))"
		/>
	</Box>
</template>
