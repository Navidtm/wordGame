<script setup lang="ts">
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

const settings = useGameSettings();

const {
	chars,
	cellCount,
	filledCells,
	isComplete,
	progress,
	canUndoClear,
	reset,
	clear,
	undoClear,
	clearPath,
} = useBoardGrid(settings.aspect);

const results = useWordResults(chars, settings.aspect, {
	minWordLength: settings.effectiveMinWordLength,
	maxWordLength: settings.maxWordLength,
	maxResults: settings.maxResults,
});

const { selectedIndex, stepMode, pathStep, selectedPath, displayedPath, toggleStepMode, moveStep } =
	usePathSelection(results.words);

const { aspect, maxResults, minWordLength, maxWordLength, hideThreeLetterWords } = settings;
const { words } = results;

watch(cellCount, settings.limitMaxWordLength, { immediate: true });
onKeyStroke('r', event => {
	if (event.ctrlKey || event.metaKey) {
		event.preventDefault();
		reset();
	}
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
		/>
		<div
			class="pointer-events-none fixed inset-0 [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:32px_32px] opacity-[.035]"
		/>
		<div class="relative mx-auto w-full max-w-2xl">
			<a
				class="skip-link"
				href="#game-board"
			>
				پرش به جدول بازی
			</a>
			<GameHeader
				:filled-cells="filledCells"
				:cell-count="cellCount"
				:progress="progress"
			/>
			<GameBoard
				v-model:chars="chars"
				v-model:aspect="aspect"
				v-model:max-results="maxResults"
				v-model:min-word-length="minWordLength"
				v-model:max-word-length="maxWordLength"
				v-model:hide-three-letter-words="hideThreeLetterWords"
				v-model:selected-index="selectedIndex"
				v-model:step-mode="stepMode"
				v-model:path-step="pathStep"
				:path="displayedPath"
				:words="words"
				:is-ready="isComplete"
				:selected-path-length="selectedPath.length"
				@clear="clear"
				@remove="clearPath(displayedPath)"
				@toggle-step-mode="toggleStepMode"
				@move-step="moveStep"
			/>
			<footer
				class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/35"
			>
				<span>
					<kbd>Alt + Tab</kbd>
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
					v-if="canUndoClear"
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
