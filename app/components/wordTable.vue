<script setup lang="ts">
import type { FoundWord } from '~/types/types';

const selected = defineModel<number>({ required: true });
const { words, isReady } = defineProps<{
	words?: FoundWord[];
	isReady: boolean;
}>();
const emit = defineEmits<{ submit: [] }>();

const selectNext = () => {
	if (words?.length) selected.value = (selected.value + 1) % words.length;
};

onKeyStroke(['Alt'], (event) => {
	event.preventDefault();
	selectNext();
});

onKeyStroke(['Enter'], () => emit('submit'));
</script>
<template>
	<div class="px-5 py-4 sm:px-6">
		<div class="mb-3 flex items-center justify-between">
			<div>
				<h2 class="text-sm font-medium text-white">واژه‌های پیدا شده</h2>
				<p class="mt-1 text-[11px] text-white/35">
					بهترین ترکیب‌ها برای این جدول
				</p>
			</div>
			<span
				class="rounded-xl bg-sky-400/10 px-2.5 py-1.5 text-[11px] text-sky-100/65"
			>
				{{ words?.length ?? 0 }} واژه
			</span>
		</div>
		<div
			v-if="!isReady"
			class="grid h-28 place-items-center rounded-2xl bg-white/[.025] text-center text-sm text-white/40"
		>
			<span>همه‌ی خانه‌ها را با یک حرف پر کنید</span>
		</div>
		<div
			v-else-if="!words?.length"
			class="grid h-28 place-items-center rounded-2xl bg-white/[.025] text-center text-sm text-white/40"
		>
			<span>واژه‌ای در این جدول پیدا نشد</span>
		</div>
		<div
			v-else
			class="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto p-1 sm:grid-cols-2 lg:grid-cols-3"
		>
			<button
				v-for="({ word, score }, i) in words"
				:key="word"
				class="premium-result flex w-full min-h-12 items-center justify-between gap-2 rounded-xl bg-white/[.035] p-3 text-sm transition duration-200 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-sky-400/60"
				:class="
					selected == i
						? 'bg-gradient-to-l from-sky-500/22 to-teal-500/12 text-white shadow-[0_8px_22px_rgba(14,116,144,.12)]'
						: 'text-white/75 hover:-translate-y-px hover:bg-white/[.075]'
				"
				:aria-pressed="selected === i"
				:aria-label="
					selected === i
						? `واژه ${word} انتخاب شده؛ برای حذف انتخاب کنید`
						: `انتخاب واژه ${word}`
				"
				@click="selected == i ? emit('submit') : (selected = i)"
			>
				{{ word }}
				<div
					:class="
						score > 6
							? 'bg-emerald-400/15 text-emerald-200'
							: 'bg-amber-300/15 text-amber-100'
					"
					class="rounded-lg px-2 py-1 text-xs"
				>
					{{ score }}
				</div>
			</button>
		</div>
	</div>
</template>
