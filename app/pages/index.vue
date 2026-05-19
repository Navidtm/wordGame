<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);
const { chars, data } = useChars(aspect);

const selected = ref<number>(0);
const path = computed(() => data?.value?.words[selected.value]?.path);

watch(chars.value, (v) => {
	if (v.indexOf('') >= 0) selected.value = 0;
});
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
		<div class="h-60 mx-auto">
			<WordTable
				v-if="data"
				v-model="selected"
				:words="data?.words"
				@submit="() => path?.forEach((v) => (chars[v] = ''))"
			/>
		</div>
	</Box>
</template>
