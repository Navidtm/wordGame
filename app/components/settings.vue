<script setup lang="ts">
const [isOpen, toggle] = useToggle(false);
const aspect = defineModel<[number, number]>('aspect', { required: true });
const maxResults = defineModel<number>('maxResults', { required: true });

const el = useTemplateRef('settings');
onClickOutside(el, () => isOpen.value && toggle());
</script>
<template>
	<div
		ref="settings"
		class="relative"
	>
		<Icon
			@click="toggle()"
			:class="isOpen ? 'bg-sky-700' : 'bg-white'"
			class="cursor-pointer hover:opacity-80 transition-all"
			name="lucide:settings-2"
			size="20"
		/>
		<div
			v-if="isOpen"
			class="absolute size-60 backdrop-blur-lg border border-white/10 left-0 rounded-xl p-4 dtransition-all duration-300"
		>
			<div class="text-sm">
				<div class="text-center mb-2">تعداد نتایح</div>
				<div class="flex gap-3 items-center justify-center">
					<button
						class="bg-sky-700 p-2 rounded-md flex items-center justify-center hover:opacity-80 transition-all cursor-pointer disabled:bg-gray-500/80 hover:disabled:opacity-100"
						@click="maxResults += 3"
						:disabled="maxResults >= 21"
					>
						<Icon
							name="lucide:arrow-up"
							size="20"
						/>
					</button>

					<div class="">{{ maxResults }}</div>
					<button
						class="bg-sky-700 p-2 rounded-md flex items-center justify-center hover:opacity-80 transition-all cursor-pointer disabled:bg-gray-500/80 hover:disabled:opacity-100"
						@click="maxResults -= 3"
						:disabled="maxResults <= 3"
					>
						<Icon
							name="lucide:arrow-down"
							size="20"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
