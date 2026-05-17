<script setup lang="ts">
const letters = ref<string[]>(Array(16).fill(''));
const path = ref<number[]>([]);
const words = computed(() => findWords(letters.value));

watch(words, (v) => {
	if (v.length) path.value = v[0]?.[1]!;
});
</script>
<template>
	<div class="flex items-center justify-center flex-col h-dvh gap-3">
		<div
			class="border-px border-white/20 rounded-md w-full max-w-xl relative flex flex-col justify-between bg-[#111312]"
		>
			<Reload
				v-if="letters.every(Boolean)"
				@click="letters.fill('')"
			/>
			<FieldTable
				v-model="letters"
				:path
			/>
			<WordTable
				v-model="path"
				:words
				@submit="(p: number[]) => p.forEach((i) => (letters[i] = ''))"
			/>
		</div>
	</div>
</template>
