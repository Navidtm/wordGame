<script setup lang="ts">
const div = useTemplateRef('icon');
onKeyStroke(['Control'], () => div.value?.click());
</script>
<template>
	<div
		ref="icon"
		class="absolute top-4 left-4 text-xs px-2 py-1 cursor-pointer hover:opacity-80 transition-all"
	>
		<Icon
			name="lucide:refresh-ccw"
			size="18"
		/>
	</div>
</template>
