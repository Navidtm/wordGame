<script setup lang="ts">
const aspect = ref<[number, number]>([4, 4]);
const path = ref<number[]>([]);
const { chars, data } = useChars(aspect);
</script>
<template>
	<Box>
		<Refresh @click="chars = []" />
		<div class="h-60"></div>
		<FieldTable
			v-model="chars"
			:aspect
			:path="data?.words ? path : []"
		/>
		<div class="h-60 mx-auto">
			<WordTable
				v-if="data?.words"
				:words="data.words"
				@select="(p: number[]) => (path = p)"
				@submit="() => path.forEach((n) => (chars[n] = ''))"
			/>
		</div>
	</Box>
</template>
