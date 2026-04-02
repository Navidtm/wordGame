<template>
	<div class="flex items-center justify-center py-12 h-dvh">
		<div class="flex max-w-xl justify-around items-center gap-4 flex-col">
			<div class="">
				<div
					ref="inputsEl"
					class="grid grid-cols-4 mb-2"
				>
					<UInput
						v-for="n in range(16)"
						v-model="letters[n]"
						:key="n"
						size="xl"
						color="info"
						maxlength="1"
						class="max-w-15 p-1 rounded-md"
						:class="{
							'bg-primary': selectedPath.includes(n),
							'bg-secondary': selectedPath[0] == n,
						}"
						@click="deleteWord([n])"
						@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
						@input="nextTick(() => focusFirstEmptyInput(letters.indexOf('')))"
					/>
				</div>
				<div class="flex w-full *:w-full *:block *:text-center gap-6">
					<UButton @click="deleteWord(selectedPath)">تایید</UButton>
					<UButton
						color="error"
						@click="deleteWord(range(16))"
					>
						پاک
					</UButton>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-2 min-h-40">
				<UButton
					v-for="{ score, word, path } in findWords(letters)"
					:key="word"
					class="cursor-pointer max-h-10"
					type="button"
					:color="isEqual(path, selectedPath) ? 'neutral' : 'primary'"
					@click="selectedPath = path"
				>
					<div class="flex justify-between w-full items-center gap-2">
						{{ word }}
						<UButton
							size="sm"
							as="div"
							:color="score > 6 ? 'success' : score > 4 ? 'warning' : 'error'"
						>
							{{ score }}
						</UButton>
					</div>
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { isEqual, range } from 'es-toolkit';

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');

const selectedPath = ref<number[]>([]);
const letters = ref<string[]>(Array(16).fill(''));

const focusFirstEmptyInput = (n: number) => {
	if (n < 0) return;
	(inputsRef.value?.children.item(n)?.firstChild as HTMLInputElement).focus();
};

const deleteWord = (path: number[]) => {
	if (path.length == 0) return;
	path.forEach((n) => (letters.value[n] = ''));
	selectedPath.value = [];
	focusFirstEmptyInput(Math.min(...path));
};

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(selectedPath.value));

onMounted(() => focusFirstEmptyInput(0));
</script>
