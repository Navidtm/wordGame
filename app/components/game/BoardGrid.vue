<script setup lang="ts">
import { range } from 'es-toolkit';

import { persianMap } from '~/utils/utils';

const chars = defineModel<string[]>({ required: true });
const { path = [], aspect } = defineProps<{ path?: number[]; aspect: [number, number] }>();
const inputs = useTemplateRef('inputs');
const pathOrder = computed(() => new Map(path.map((cell, index) => [cell, index + 1])));
const orderFor = (index: number) => pathOrder.value.get(index);
const persianNumber = (value: number) => value.toLocaleString('fa-IR');
const focus = (index: number) => inputs.value?.[index]?.focus();
const firstEmptyIndex = () => chars.value.indexOf('');

const normalizeCharacter = (value: string) => {
	const character = (Array.from(value).at(-1) ?? '').replace('ي', 'ی').replace('ك', 'ک');
	return /[آ-ی]/.test(character) ? character : (persianMap.get(character.toLowerCase()) ?? '');
};
const handleInput = (index: number, event: Event) => {
	const input = event.target as HTMLInputElement;
	chars.value[index] = normalizeCharacter(input.value);
	input.value = chars.value[index]!;
	const nextEmpty = firstEmptyIndex();
	if (chars.value[index] && nextEmpty !== -1) focus(nextEmpty);
};
const handleBackspace = (index: number) => {
	if (chars.value[index]) return void (chars.value[index] = '');
	if (index > 0) {
		chars.value[index - 1] = '';
		focus(index - 1);
	}
};

onStartTyping(() => focus(Math.max(0, firstEmptyIndex())));
</script>

<template>
	<div
		class="word-grid mx-auto rounded-[1.35rem] bg-[#0b1114]/55 p-2 shadow-[inset_0_1px_0_rgba(125,211,252,.04),inset_0_0_30px_rgba(0,0,0,.22)] sm:p-4"
		:style="{ '--grid-columns': aspect[0], gridTemplateColumns: `repeat(${aspect[0]}, 1fr)` }"
		role="group"
		aria-label="جدول حروف"
	>
		<div
			v-for="index in range(aspect[0] * aspect[1])"
			:key="index"
			class="relative"
		>
			<input
				ref="inputs"
				ref_for
				:value="chars[index]"
				maxlength="1"
				inputmode="text"
				class="premium-tile word-tile rounded-[.85rem] bg-gradient-to-b from-[#29363a] to-[#1a2428] text-center text-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_7px_14px_rgba(0,0,0,.16)] transition duration-200 hover:-translate-y-0.5 hover:from-[#334448] hover:to-[#202d31] focus:-translate-y-0.5 focus:bg-[#26383c] focus:ring-4 focus:ring-sky-400/35 focus:outline-none sm:text-2xl"
				:class="
					orderFor(index)
						? 'bg-gradient-to-b from-sky-400/50 to-teal-500/25 text-white shadow-[0_0_24px_rgba(45,212,191,.2)]'
						: ''
				"
				:aria-label="
					orderFor(index)
						? `حرف خانه ${index + 1}، حرف ${persianNumber(orderFor(index)!)} واژهٔ انتخاب‌شده`
						: `حرف خانه ${index + 1}`
				"
				@input="handleInput(index, $event)"
				@keydown.backspace.prevent="handleBackspace(index)"
			/>
			<span
				v-if="orderFor(index)"
				class="pointer-events-none absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full border border-sky-100/40 bg-sky-200 text-[10px] leading-none font-bold text-slate-950 shadow-[0_2px_8px_rgba(14,165,233,.45)] sm:size-6 sm:text-xs"
				aria-hidden="true"
				>{{ persianNumber(orderFor(index)!) }}</span
			>
		</div>
	</div>
</template>
