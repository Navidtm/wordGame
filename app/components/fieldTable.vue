<script setup lang="ts">
import { range } from 'es-toolkit';

const props = defineProps<{
	path: number[];
	chars: string[];
	aspect: [number, number];
}>();

const emit = defineEmits<{ delete: [number[]]; insert: [string, number] }>();

const inputs = useTemplateRef('inputs');

const { focus, parseInput } = useInputEl(inputs);

onMounted(() => focus(0));
watch(props.chars, (v) => focus(v.indexOf('')));
</script>
<template>
	<div
		class="grid rounded-lg p-4 gap-2 w-fit mx-auto"
		:style="{ gridTemplateColumns: `repeat(${aspect[0]},1fr)` }"
	>
		<input
			v-for="n in range(aspect[0] * aspect[1])"
			:key="n"
			ref="inputs"
			ref_for
			maxlength="1"
			class="rounded-md border border-black/30 w-14 h-12 text-center transition-all hover:opacity-80"
			:class="path.includes(n) ? 'bg-gray-700' : 'bg-gray-800'"
			:value="chars[n]"
			@click="emit('delete', [n])"
			@keyup.delete="emit('delete', chars[n] ? [n] : [n - 1])"
			@input="() => emit('insert', parseInput(n), n)"
		/>
	</div>
</template>
