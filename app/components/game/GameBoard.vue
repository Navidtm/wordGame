<script setup lang="ts">
import type { FoundWord } from '~/types/types';

defineProps<{
	chars: string[];
	aspect: [number, number];
	path: number[];
	words: FoundWord[];
	isReady: boolean;
	isSearching: boolean;
	selectedPathLength: number;
	maxResults: number;
	minWordLength: number;
	maxWordLength: number;
	hideThreeLetterWords: boolean;
	selectedIndex: number;
	stepMode: boolean;
	pathStep: number;
}>();
const emit = defineEmits<{
	'update:chars': [value: string[]];
	'update:aspect': [value: [number, number]];
	'update:maxResults': [value: number];
	'update:minWordLength': [value: number];
	'update:maxWordLength': [value: number];
	'update:hideThreeLetterWords': [value: boolean];
	'update:selectedIndex': [value: number];
	'update:stepMode': [value: boolean];
	'update:pathStep': [value: number];
	clear: [];
	remove: [];
	toggleStepMode: [];
	moveStep: [amount: number];
}>();
</script>

<template>
	<section
		id="game-board"
		class="premium-panel relative overflow-hidden rounded-[1.75rem] bg-[#13191d]/60 shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl"
		aria-labelledby="board-title"
	>
		<div
			class="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-300/15 from-15% to-transparent"
		/>
		<div class="relative flex items-center justify-between gap-3 px-5 py-5 sm:px-6">
			<div>
				<div class="flex items-center gap-2">
					<span
						class="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,.9)]"
					/>
					<h2
						id="board-title"
						class="text-base font-medium text-white"
					>
						جدول حروف
					</h2>
				</div>
				<p class="mt-1 text-xs text-white/40">
					حروف جدول را وارد کنید تا واژه‌ها و مسیرشان پیدا شوند
				</p>
			</div>
			<div class="flex items-center gap-2">
				<GameSettingsPopover
					:aspect="aspect"
					:max-results="maxResults"
					:min-word-length="minWordLength"
					:max-word-length="maxWordLength"
					:hide-three-letter-words="hideThreeLetterWords"
					@update:aspect="emit('update:aspect', $event)"
					@update:max-results="emit('update:maxResults', $event)"
					@update:min-word-length="emit('update:minWordLength', $event)"
					@update:max-word-length="emit('update:maxWordLength', $event)"
					@update:hide-three-letter-words="emit('update:hideThreeLetterWords', $event)"
				/>
				<UiIconButton
					label="پاک کردن جدول"
					@click="emit('clear')"
				>
					<Icon
						name="lucide:rotate-ccw"
						size="17"
					/>
				</UiIconButton>
			</div>
		</div>
		<div class="px-3 py-3 sm:px-6 sm:py-5">
			<GameBoardGrid
				:model-value="chars"
				:aspect="aspect"
				:path="path"
				@update:model-value="emit('update:chars', $event)"
			/>
		</div>
		<div
			class="mx-5 h-px bg-gradient-to-r from-transparent via-sky-200/10 to-transparent sm:mx-6"
		/>
		<GameWordResults
			:words="words"
			:is-ready="isReady"
			:is-searching="isSearching"
			:selected-path-length="selectedPathLength"
			:selected-index="selectedIndex"
			:step-mode="stepMode"
			:path-step="pathStep"
			@update:selected-index="emit('update:selectedIndex', $event)"
			@update:step-mode="emit('update:stepMode', $event)"
			@update:path-step="emit('update:pathStep', $event)"
			@remove="emit('remove')"
			@toggle-step-mode="emit('toggleStepMode')"
			@move-step="emit('moveStep', $event)"
		/>
	</section>

	<!-- prettier-ignore-end -->
</template>
