<script setup lang="ts">
const selected = ref<number>(0);
const letters = ref<string[]>(Array(16).fill(''));
const words = computed(() => findWords(letters.value));
const path = computed(() => words.value[selected.value]?.[1] ?? []);

const deleteWord = (p: number[]) => p.forEach((n) => (letters.value[n] = ''));

watch(letters.value, (v) => {
	if (v.indexOf('') >= 0) selected.value = 0;
});

onKeyStroke(['Shift'], () => selected.value++);
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
				:selected
				:words
				@select="
					(i: number) => (selected == i ? deleteWord(path) : (selected = i))
				"
			/>
		</div>
	</div>
</template>
