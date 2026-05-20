<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);

const selected = ref(0);
const { chars, data } = useChars(aspect);

const path = computed(() => data?.value?.words[selected.value]?.path);

const submit = () => {
	path?.value?.forEach((n) => (chars.value[n] = ''));
	selected.value = 0;
};
</script>
<template>
	<Box>
		<Refresh @click="chars = []" />
		<div class="h-60"></div>
		<FieldTable
			v-model="chars"
			:aspect
			:path
		/>
		<WordTable
			v-model="selected"
			:words="data?.words"
			@submit="submit"
		/>
	</Box>
</template>
