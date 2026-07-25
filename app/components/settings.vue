<script setup lang="ts">
const [isOpen, toggle] = useToggle(false);
const aspect = defineModel<[number, number]>('aspect', { required: true });
const maxResults = defineModel<number>('maxResults', { required: true });

const el = useTemplateRef('settings');
onClickOutside(el, () => isOpen.value && toggle());

const setDimension = (index: 0 | 1, value: string | number) => {
	const dimension = Math.min(8, Math.max(2, Number(value) || 2));
	const next = [...aspect.value] as [number, number];
	next[index] = dimension;
	aspect.value = next;
};
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
			class="absolute w-60 backdrop-blur-lg border border-white/10 left-0 rounded-xl p-4 transition-all duration-300"
		>
			<div class="text-sm">
					<div class="text-center mb-2">تعداد نتایج</div>
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
				<div class="text-sm mt-5">
					<div class="text-center mb-2">اندازه جدول</div>
					<div class="flex gap-3 items-center justify-center" dir="ltr">
						<input
							class="w-16 rounded-md bg-gray-800 p-2 text-center outline-none ring-2 ring-transparent focus:ring-sky-800"
							type="number"
							min="2"
							max="8"
							:value="aspect[0]"
							@change="setDimension(0, ($event.target as HTMLInputElement).value)"
						/>
						<span>×</span>
						<input
							class="w-16 rounded-md bg-gray-800 p-2 text-center outline-none ring-2 ring-transparent focus:ring-sky-800"
							type="number"
							min="2"
							max="8"
							:value="aspect[1]"
							@change="setDimension(1, ($event.target as HTMLInputElement).value)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
