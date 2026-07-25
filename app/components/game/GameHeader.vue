<script setup lang="ts">
defineProps<{
	filledCells: number;
	cellCount: number;
	progress: string;
}>();
</script>

<template>
	<!-- prettier-ignore-start -->

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
				<p class="mb-1 text-[10px] font-medium text-sky-200">حل‌کنندهٔ جدول واژهٔ فارسی</p>
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
				<span class="text-sm text-content-subtle">/ {{ cellCount }}</span>
			</div>
			<div class="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
				<div
					class="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-200 transition-all duration-300"
					:style="{ width: progress }"
				/>
			</div>
		</div>
	</header>

	<!-- prettier-ignore-end -->
</template>
