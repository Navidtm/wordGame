<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);

const selected = ref(0);
const { chars, data } = useChars(aspect);

const path = computed(() => data?.value?.words[selected.value]?.path);
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
			@submit="() => path?.forEach((n) => (chars[n] = ''))"
		/>
	</Box>
</template>
