<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);
const { chars, data } = useChars(aspect);

const selected = ref(0);
const path = computed(() => data?.value?.words[selected.value]?.path);

const submit = () => {
	path?.value?.forEach((n) => (chars.value[n] = ''));
	selected.value = 0;
};
onKeyStroke(['Enter'], submit);
</script>
<template>
	<Box>
		{{ selected }}
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
