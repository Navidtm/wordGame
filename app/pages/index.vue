<script setup lang="ts">
const path = ref<number[]>([]);
const letters = ref<string[]>(Array(16).fill(''));

watch(path, (v, o) => {
	if (v.length == 0) o.forEach((i) => (letters.value[i] = ''));
});

watch(letters.value, (v) => {
	if (v.indexOf('') >= 0) path.value = [];
});
</script>
<template>
	<div class="flex items-center justify-center flex-col h-dvh gap-3">
		<div
			class="border-px border-white/20 rounded-md w-full max-w-xl relative flex flex-col justify-between bg-[#111312]"
		>
			<Reload
				v-if="letters.some(Boolean)"
				@click="letters.fill('')"
			/>
			<FieldTable
				v-model="letters"
				:path
			/>
			<WordTable
				v-model="path"
				:letters
			/>
		</div>
	</div>
</template>
