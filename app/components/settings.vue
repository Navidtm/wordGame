<script setup lang="ts">
const [isOpen, toggle] = useToggle(false);
const aspect = defineModel<[number, number]>('aspect', { required: true });
const maxResults = defineModel<number>('maxResults', { required: true });
const minWordLength = defineModel<number>('minWordLength', { required: true });
const maxWordLength = defineModel<number>('maxWordLength', { required: true });
const hideThreeLetterWords = defineModel<boolean>('hideThreeLetterWords', {
	required: true,
});

const el = useTemplateRef('settings');
onClickOutside(el, () => isOpen.value && toggle());
onKeyStroke('Escape', () => {
	if (isOpen.value) toggle(false);
});

const setDimension = (index: 0 | 1, value: string | number) => {
	const dimension = Math.min(5, Math.max(2, Number(value) || 2));
	const next = [...aspect.value] as [number, number];
	next[index] = dimension;
	aspect.value = next;
};

const changeDimension = (index: 0 | 1, amount: number) =>
	setDimension(index, aspect.value[index] + amount);
</script>
<template>
	<div
		ref="settings"
		class="relative"
	>
		<button
			@click="toggle()"
			:class="
				isOpen
					? 'bg-sky-400/18 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,.15)]'
					: 'bg-white/[.055] text-white/60'
			"
			class="grid size-11 place-items-center rounded-xl transition duration-200 hover:bg-sky-400/15 hover:text-sky-100 focus:ring-2 focus:ring-sky-500/50 focus:outline-none active:scale-95"
			type="button"
			aria-label="تنظیمات بازی"
			:aria-expanded="isOpen"
			aria-controls="game-settings"
		>
			<Icon
				name="lucide:sliders-horizontal"
				size="20"
				class="text-sky-300"
			/>
		</button>
		<Transition name="settings-popover">
			<div
				v-if="isOpen"
				id="game-settings"
				class="absolute left-0 z-10 mt-3 w-72 overflow-hidden rounded-2xl border border-white/[.08] bg-[#162126]/98 shadow-[0_22px_55px_rgba(0,0,0,.48)] backdrop-blur-xl"
				role="dialog"
				aria-label="تنظیمات بازی"
			>
				<div class="bg-gradient-to-l from-sky-400/12 to-transparent px-4 py-3.5">
					<div class="flex items-center gap-2 text-sm text-white">
						<Icon
							name="lucide:sliders-horizontal"
							size="16"
							class="text-sky-300"
						/>
						<span>تنظیمات بازی</span>
					</div>
					<p class="mt-1 pr-6 text-[11px] text-white/40">نمای بازی را مطابق سلیقه‌تان تنظیم کنید</p>
				</div>
				<div class="space-y-5 p-4 pt-3">
					<div>
						<div class="mb-2 flex items-center justify-between text-xs">
							<span class="text-white/50">طول واژه</span>
							<span class="text-white/35">حداقل تا حداکثر</span>
						</div>
						<div
							class="grid grid-cols-2 gap-2"
							dir="ltr"
						>
							<label class="rounded-xl bg-black/20 px-2.5 py-2 text-left">
								<span class="block text-[10px] text-white/40">MIN</span>
								<input
									v-model.number="minWordLength"
									class="mt-1 w-full bg-transparent text-center text-sm text-white outline-none focus:text-sky-100"
									type="number"
									min="3"
									:max="maxWordLength"
									aria-label="حداقل طول واژه"
								/>
							</label>
							<label class="rounded-xl bg-black/20 px-2.5 py-2 text-left">
								<span class="block text-[10px] text-white/40">MAX</span>
								<input
									v-model.number="maxWordLength"
									class="mt-1 w-full bg-transparent text-center text-sm text-white outline-none focus:text-sky-100"
									type="number"
									:min="minWordLength"
									max="25"
									aria-label="حداکثر طول واژه"
								/>
							</label>
						</div>
						<label
							class="mt-2 flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl bg-black/20 px-3 text-xs text-white/65"
						>
							<span>مخفی‌کردن واژه‌های سه‌حرفی</span>
							<input
								v-model="hideThreeLetterWords"
								class="size-4 accent-sky-400"
								type="checkbox"
							/>
						</label>
					</div>
					<div>
						<div class="mb-2 flex items-center justify-between text-xs">
							<span class="text-white/50">تعداد واژه‌ها</span>
							<span class="rounded-lg bg-sky-400/10 px-2 py-1 text-sky-100">
								{{ maxResults }}
							</span>
						</div>
						<div
							class="flex overflow-hidden rounded-xl bg-black/20 p-1"
							dir="ltr"
						>
							<button
								v-for="count in [6, 12, 18, 21]"
								:key="count"
								class="flex-1 rounded-lg py-1.5 text-xs transition"
								:class="
									maxResults === count
										? 'bg-sky-400/20 text-sky-100 shadow-sm'
										: 'text-white/40 hover:text-white/75'
								"
								type="button"
								@click="maxResults = count"
							>
								{{ count }}
							</button>
						</div>
					</div>
					<div>
						<div class="mb-2 text-xs text-white/50">اندازه جدول</div>
						<div
							class="grid grid-cols-2 gap-2"
							dir="ltr"
						>
							<div
								v-for="(dimension, index) in aspect"
								:key="index"
								class="flex items-center justify-between rounded-xl bg-black/20 p-1"
							>
								<button
									class="grid size-9 place-items-center rounded-lg text-white/55 transition hover:bg-white/8 hover:text-white focus:ring-2 focus:ring-sky-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-25"
									type="button"
									:aria-label="`کاهش ${index === 0 ? 'عرض' : 'ارتفاع'} جدول`"
									:disabled="dimension <= 2"
									@click="changeDimension(index as 0 | 1, -1)"
								>
									<Icon
										name="lucide:minus"
										size="14"
									/>
								</button>
								<span
									class="text-sm text-white/80"
									:aria-label="`${index === 0 ? 'عرض' : 'ارتفاع'}: ${dimension}`"
								>
									{{ dimension }}
								</span>
								<button
									class="grid size-9 place-items-center rounded-lg text-white/55 transition hover:bg-white/8 hover:text-white focus:ring-2 focus:ring-sky-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-25"
									type="button"
									:aria-label="`افزایش ${index === 0 ? 'عرض' : 'ارتفاع'} جدول`"
									:disabled="dimension >= 5"
									@click="changeDimension(index as 0 | 1, 1)"
								>
									<Icon
										name="lucide:plus"
										size="14"
									/>
								</button>
							</div>
						</div>
						<p class="mt-2 text-center text-[10px] text-white/30">عرض × ارتفاع</p>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
