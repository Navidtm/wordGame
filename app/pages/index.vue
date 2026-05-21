<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);

const selected = ref(0);
const { chars, words } = useChars(aspect);

const submit = (path?: number[]) => {
	if (path) path.forEach((n) => (chars.value[n] = ''));
	else chars.value.fill('');
	selected.value = 0;
};
</script>
<template>
	<Box>
		<template #toolbar>
			<Refresh @click="submit()" />
		</template>
		<FieldTable
			v-model="chars"
			:aspect
			:path="words?.[selected]?.path"
		/>
		<WordTable
			v-model="selected"
			:words
			@submit="submit"
		/>
	</Box>
</template>
