<script setup lang="ts">
const { label, active = false } = defineProps<{
	label: string;
	active?: boolean;
}>();
</script>

<template>
	<button
		class="grid size-11 place-items-center rounded-xl transition duration-200 focus:ring-2 focus:ring-sky-400/60 focus:outline-none active:scale-95"
		:class="
			active
				? 'bg-sky-400/18 text-sky-100'
				: 'bg-white/[.055] text-content-muted hover:bg-white/10 hover:text-white'
		"
		type="button"
		:aria-label="label"
	>
		<slot />
	</button>
</template>
