<script setup lang="ts">
const path = ref<number[]>([]);
const words = ref<Words>([]);
</script>
<template>
	<div class="flex items-center justify-center flex-col h-dvh gap-3">
		<div
			class="border-px border-white/20 rounded-md w-full max-w-xl relative flex flex-col justify-between bg-[#111312]"
		>
			<FieldTable
				v-model="path"
				@find="(w: Words) => (words = w)"
			/>
			<WordTable
				v-model="path"
				:words
			/>
		</div>
	</div>
</template>
