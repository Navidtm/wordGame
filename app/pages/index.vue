<script setup lang="ts">
import { chunk } from 'es-toolkit';

const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '');
const title = 'حل‌کنندهٔ جدول واژهٔ فارسی';
const description =
	'حروف جدول واژه را وارد کنید تا واژه‌های فارسی قابل ساخت، مسیر دقیق حروف و نتایج فیلترشده را سریع پیدا کنید.';
const shareImage = siteUrl ? `${siteUrl}/screenshots/solver-results.png` : undefined;

useSeoMeta({
	title,
	description,
	robots: 'index, follow',
	ogTitle: title,
	ogDescription: description,
	ogType: 'website',
	ogLocale: 'fa_IR',
	ogUrl: siteUrl || undefined,
	ogImage: shareImage,
	ogImageAlt: 'نمای ابزار شکار واژه، حل‌کنندهٔ جدول واژهٔ فارسی',
	twitterCard: 'summary_large_image',
	twitterTitle: title,
	twitterDescription: description,
	twitterImage: shareImage,
});

useHead(() => ({
	meta: [
		{
			name: 'keywords',
			content: 'حل جدول واژه, حل کننده Boggle فارسی, واژه یاب فارسی, جدول حروف, شکار واژه',
		},
	],
	link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'WebApplication',
				name: 'شکار واژه',
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'Web',
				inLanguage: 'fa-IR',
				description,
				...(siteUrl ? { url: siteUrl } : {}),
			}),
		},
	],
}));

const maxResults = ref(12);
const aspect = ref<[number, number]>([4, 4]);
const chars = ref(Array(aspect.value[0] * aspect.value[1]).fill(''));
const minWordLength = ref(3);
const maxWordLength = ref(16);
const hideThreeLetterWords = ref(false);
const cellCount = computed(() => aspect.value[0] * aspect.value[1]);
const filledCells = computed(() => chars.value.filter(Boolean).length);
const boardReady = computed(() => filledCells.value === cellCount.value);
const boardProgress = computed(() => `${(filledCells.value / cellCount.value) * 100}%`);
const effectiveMinWordLength = computed(() =>
	Math.max(minWordLength.value, hideThreeLetterWords.value ? 4 : 3),
);

const words = computed(() => {
	if (chars.value.some(char => !char)) return [];
	return searchWordsInGrid(chunk(chars.value, aspect.value[0]), {
		minWordLength: effectiveMinWordLength.value,
		maxWordLength: maxWordLength.value,
		maxResults: maxResults.value,
	});
});

const selected = ref(0);
const stepMode = ref(false);
const pathStep = ref(0);
const selectedPath = computed(() => words.value?.[selected.value]?.path ?? []);
const path = computed(() =>
	stepMode.value ? selectedPath.value.slice(0, pathStep.value + 1) : selectedPath.value,
);
const clearedChars = ref<string[] | null>(null);
const undoVisible = ref(false);
let undoTimer: ReturnType<typeof setTimeout> | undefined;

const submit = () => path.value?.forEach(n => (chars.value[n] = ''));

const clearBoard = () => {
	clearedChars.value = [...chars.value];
	chars.value.fill('');
	undoVisible.value = true;
	clearTimeout(undoTimer);
	undoTimer = setTimeout(() => (undoVisible.value = false), 5000);
};

const undoClear = () => {
	if (!clearedChars.value) return;
	chars.value = [...clearedChars.value];
	undoVisible.value = false;
	clearTimeout(undoTimer);
};

onKeyStroke('r', event => {
	if (!event.ctrlKey && !event.metaKey) return;
	event.preventDefault();
	chars.value.fill('');
});
watch(aspect, () => {
	chars.value = Array(cellCount.value).fill('');
	maxWordLength.value = Math.min(maxWordLength.value, cellCount.value);
	selected.value = 0;
});

watch([minWordLength, maxWordLength], () => {
	if (minWordLength.value > maxWordLength.value) maxWordLength.value = minWordLength.value;
});

watch(selected, () => (pathStep.value = 0));

watch(words, value => {
	selected.value = value.length ? Math.min(selected.value, value.length - 1) : 0;
});
</script>
<template>
	<main
		id="main-content"
		class="min-h-dvh overflow-x-hidden bg-[#090d10] px-4 py-5 sm:px-6 sm:py-10"
		tabindex="-1"
	>
		<div
			class="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(56,189,248,.17),transparent_37%),radial-gradient(circle_at_0%_80%,rgba(16,185,129,.10),transparent_28%),radial-gradient(circle_at_100%_65%,rgba(99,102,241,.09),transparent_30%)]"
		></div>
		<div
			class="pointer-events-none fixed inset-0 [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:32px_32px] opacity-[.035]"
		></div>
		<div class="relative mx-auto w-full max-w-2xl">
			<a
				class="skip-link"
				href="#game-board"
			>
				پرش به جدول بازی
			</a>
			<header class="mb-7 flex items-center justify-between gap-4 px-1 sm:px-2">
				<div class="flex items-center gap-3.5">
					<div
						class="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-300/25 to-indigo-500/20 shadow-lg shadow-sky-950/40"
					>
						<Icon
							name="lucide:scan-search"
							class="text-sky-100"
							size="21"
						/>
					</div>
					<div>
						<p class="mb-1 text-[10px] font-medium text-sky-300/70">حل‌کنندهٔ جدول واژهٔ فارسی</p>
						<h1 class="text-2xl font-medium tracking-tight text-white sm:text-3xl">شکار واژه</h1>
					</div>
				</div>
				<div
					class="min-w-25 rounded-2xl bg-[#162126]/85 px-3.5 py-2.5 text-left shadow-lg shadow-black/20 backdrop-blur-md"
					dir="ltr"
					role="status"
					aria-live="polite"
					aria-label="پیشرفت تکمیل جدول"
				>
					<div class="flex items-baseline gap-1">
						<span class="text-xl leading-none font-medium text-white">
							{{ filledCells }}
						</span>
						<span class="text-sm text-white/35">/ {{ cellCount }}</span>
					</div>
					<div class="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
						<div
							class="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-200 transition-all duration-300"
							:style="{ width: boardProgress }"
						></div>
					</div>
				</div>
			</header>

			<section
				id="game-board"
				class="premium-panel relative overflow-hidden rounded-[1.75rem] bg-[#13191d]/60 shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl"
				aria-labelledby="board-title"
			>
				<div
					class="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-300/15 from-15% to-transparent"
				></div>
				<div class="relative flex items-center justify-between gap-3 px-5 py-5 sm:px-6">
					<div>
						<div class="flex items-center gap-2">
							<span
								class="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,.9)]"
							></span>
							<h2
								id="board-title"
								class="text-base font-medium text-white"
								>جدول حروف</h2
							>
						</div>
						<p class="mt-1 text-xs text-white/40">
							حروف جدول را وارد کنید تا واژه‌ها و مسیرشان پیدا شوند
						</p>
					</div>
					<div class="flex items-center gap-2">
						<Settings
							v-model:aspect="aspect"
							v-model:max-results="maxResults"
							v-model:min-word-length="minWordLength"
							v-model:max-word-length="maxWordLength"
							v-model:hide-three-letter-words="hideThreeLetterWords"
						/>
						<button
							class="grid size-11 place-items-center rounded-xl bg-white/[.055] text-white/60 transition duration-200 hover:bg-rose-400/15 hover:text-rose-200 focus:ring-2 focus:ring-rose-400/50 focus:outline-none active:scale-95"
							type="button"
							aria-label="پاک کردن جدول"
							@click="clearBoard"
						>
							<Icon
								name="lucide:rotate-ccw"
								size="17"
							/>
						</button>
					</div>
				</div>
				<div class="px-3 py-3 sm:px-6 sm:py-5">
					<FieldTable
						v-model="chars"
						:aspect
						:path
					/>
				</div>
				<div
					class="mx-5 h-px bg-gradient-to-r from-transparent via-sky-200/10 to-transparent sm:mx-6"
				></div>
				<WordTable
					v-model="selected"
					v-model:step-mode="stepMode"
					v-model:path-step="pathStep"
					:words
					:is-ready="boardReady"
					:selected-path-length="selectedPath.length"
					@submit="submit"
				/>
			</section>

			<footer
				class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/35"
			>
				<span>
					<kbd>Tab</kbd>
					واژه‌ی بعدی
				</span>
				<span>
					<kbd>Enter</kbd>
					حذف واژه
				</span>
				<span>
					<kbd>⌘/Ctrl + R</kbd>
					شروع دوباره
				</span>
			</footer>
			<Transition name="toast">
				<div
					v-if="undoVisible"
					class="fixed inset-x-4 bottom-5 z-20 mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-white/10 bg-[#172126]/95 px-3 py-2.5 text-sm text-white shadow-[0_14px_40px_rgba(0,0,0,.45)] backdrop-blur-xl"
					role="status"
					aria-live="polite"
				>
					<span>جدول پاک شد</span>
					<button
						class="min-h-11 rounded-xl bg-sky-400/15 px-3 font-medium text-sky-100 transition hover:bg-sky-400/25 focus:ring-2 focus:ring-sky-400/60 focus:outline-none"
						type="button"
						@click="undoClear"
					>
						بازگردانی
					</button>
				</div>
			</Transition>
		</div>
	</main>
</template>
