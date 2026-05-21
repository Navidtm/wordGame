<script setup lang="ts">
const div = useTemplateRef('icon');
onKeyStroke(['Control'], () => div.value?.click());
</script>
<template>
	<div ref="icon">
		<Icon
			class="cursor-pointer hover:opacity-80 transition-all"
			name="lucide:refresh-ccw"
			size="18"
		/>
	</div>
</template>
