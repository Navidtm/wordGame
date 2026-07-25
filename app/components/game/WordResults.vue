<script setup lang="ts">
import type { FoundWord } from '~/types/types';

const selectedIndex = defineModel<number>('selectedIndex', { required: true });
const stepMode = defineModel<boolean>('stepMode', { required: true });
const pathStep = defineModel<number>('pathStep', { required: true });

const { words, isReady, selectedPathLength } = defineProps<{
	words: FoundWord[];
	isReady: boolean;
	isSearching: boolean;
	selectedPathLength: number;
}>();

const emit = defineEmits<{ remove: []; toggleStepMode: []; moveStep: [amount: number] }>();

const buttons = useTemplateRef('buttons');

const { copied, copy } = useClipboard({ legacy: true });

const selectedWord = computed(() => words[selectedIndex.value]?.word ?? '');
const allWords = computed(() => words.map(({ word }) => word).join('\n'));

const focusWord = async (index: number) => {
	await nextTick();
	buttons.value?.[index]?.focus();
};

watch([() => isReady, () => words.length], ([ready, count], [wasReady, previousCount]) => {
	if (!ready || !count || (wasReady && previousCount)) return;
	selectedIndex.value = 0;
	focusWord(0);
});
</script>

<template>
	<div class="px-5 py-4 sm:px-6">
		<div class="mb-3 flex items-start justify-between gap-3">
			<div>
				<h2 class="text-sm font-medium text-white">واژه‌های پیدا شده</h2>
				<p class="mt-1 text-[11px] text-content-subtle">بهترین ترکیب‌ها برای این جدول</p>
			</div>
			<div class="flex flex-wrap justify-end gap-1.5">
				<span class="rounded-xl bg-sky-400/10 px-2.5 py-1.5 text-[11px] text-sky-100/65">
					{{ words.length }} واژه
				</span>
				<button
					v-if="words.length"
					class="grid size-8 place-items-center rounded-lg bg-white/[.055] text-content-muted transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-sky-400/60 focus:outline-none"
					type="button"
					:aria-label="copied ? 'واژه کپی شد' : 'کپی واژهٔ انتخاب‌شده'"
					@click="copy(selectedWord)"
				>
					<Icon
						:name="copied ? 'lucide:check' : 'lucide:copy'"
						size="14"
					/>
				</button>
				<button
					v-if="words.length"
					class="grid size-8 place-items-center rounded-lg bg-white/[.055] text-content-muted transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-sky-400/60 focus:outline-none"
					type="button"
					:aria-label="copied ? 'فهرست واژه‌ها کپی شد' : 'کپی همهٔ واژه‌ها'"
					@click="copy(allWords)"
				>
					<Icon
						name="lucide:copy-plus"
						size="14"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="words.length && selectedPathLength"
			class="mb-3 flex items-center justify-between rounded-xl bg-black/15 p-1.5 text-xs text-content-muted"
		>
			<button
				class="min-h-9 rounded-lg px-2 transition hover:bg-white/8 hover:text-white focus:ring-2 focus:ring-sky-400/60 focus:outline-none"
				type="button"
				:aria-pressed="stepMode"
				@click="emit('toggleStepMode')"
			>
				{{ stepMode ? 'نمایش کامل مسیر' : 'مرحله‌به‌مرحله' }}
			</button>
			<div
				v-if="stepMode"
				class="flex items-center gap-1"
				dir="ltr"
			>
				<button
					class="grid size-9 place-items-center rounded-lg transition hover:bg-white/8 focus:ring-2 focus:ring-sky-400/60 focus:outline-none disabled:opacity-30"
					type="button"
					aria-label="حرف قبلی مسیر"
					:disabled="pathStep === 0"
					@click="emit('moveStep', -1)"
				>
					<Icon
						name="lucide:chevron-left"
						size="15"
					/>
				</button>
				<span
					class="min-w-12 text-center"
					dir="rtl"
				>
					{{ pathStep + 1 }} از {{ selectedPathLength }}
				</span>
				<button
					class="grid size-9 place-items-center rounded-lg transition hover:bg-white/8 focus:ring-2 focus:ring-sky-400/60 focus:outline-none disabled:opacity-30"
					type="button"
					aria-label="حرف بعدی مسیر"
					:disabled="pathStep >= selectedPathLength - 1"
					@click="emit('moveStep', 1)"
				>
					<Icon
						name="lucide:chevron-right"
						size="15"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="isSearching"
			class="grid h-28 place-items-center rounded-2xl bg-white/[.025] text-center text-sm text-content-muted"
		>
			در حال جست‌وجوی واژه‌ها…
		</div>
		<div
			v-else-if="!isReady"
			class="grid h-28 place-items-center rounded-2xl bg-white/[.025] text-center text-sm text-content-muted"
		>
			همه‌ی خانه‌ها را با یک حرف پر کنید
		</div>
		<div
			v-else-if="!words.length"
			class="grid h-28 place-items-center rounded-2xl bg-white/[.025] text-center text-sm text-content-muted"
		>
			واژه‌ای در این جدول پیدا نشد
		</div>
		<div
			v-else
			class="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto p-1 sm:grid-cols-2 lg:grid-cols-3"
		>
			<button
				v-for="({ word, score }, index) in words"
				:key="word"
				ref="buttons"
				ref_for
				class="premium-result flex min-h-12 w-full items-center justify-between gap-2 rounded-xl bg-white/[.035] p-3 text-sm transition duration-200 focus:ring-2 focus:ring-sky-400/60 focus:outline-none active:scale-[.98]"
				:class="
					selectedIndex === index
						? 'bg-gradient-to-l from-sky-500/22 to-teal-500/12 text-white shadow-[0_8px_22px_rgba(14,116,144,.12)]'
						: 'text-content-strong hover:-translate-y-px hover:bg-white/[.075]'
				"
				:aria-pressed="selectedIndex === index"
				:aria-label="
					selectedIndex === index
						? `واژه ${word} انتخاب شده؛ برای حذف انتخاب کنید`
						: `انتخاب واژه ${word}`
				"
				@click="selectedIndex === index ? emit('remove') : (selectedIndex = index)"
				@focus="selectedIndex = index"
			>
				{{ word }}
				<span
					:class="
						score > 6 ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-300/15 text-amber-100'
					"
					class="rounded-lg px-2 py-1 text-xs"
				>
					{{ score }}
				</span>
			</button>
		</div>
	</div>

	<!-- prettier-ignore-end -->
</template>
