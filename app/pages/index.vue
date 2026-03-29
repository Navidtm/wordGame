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
						@click="letters[n] = ''"
						@keyup.delete="onDelete(n)"
						@focus="focusFirstEmptyInput()"
						@input="focusFirstEmptyInput()"
					/>
				</div>
				<div class="flex w-full *:w-full *:block *:text-center gap-6">
					<UButton @click="deleteWord()">تایید</UButton>
					<UButton
						color="error"
						@click="deleteAll()"
					>
						پاک
					</UButton>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-2 min-h-40">
				<UButton
					v-for="({ score, word, path }, i) in data"
					:key="word"
					class="cursor-pointer max-h-10"
					type="button"
					:color="isEqual(path, selectedPath) ? colorButton(score) : 'primary'"
					@click="selectedPath = path"
				>
					<div class="flex justify-between w-full items-center gap-2">
						{{ word }}
						<UButton
							size="sm"
							as="div"
							:color="colorButton(score)"
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
import { range, isEqual } from 'es-toolkit';
import { isEmpty } from 'es-toolkit/compat';

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');

const selectedPath = ref<number[]>([]);
const letters = ref<string[]>(Array(16));
const data = computed(() => findWords(letters.value));

const focusFirstEmptyInput = () => {
	nextTick(() => {
		const firstIndex = letters.value.findIndex(isEmpty);
		if (firstIndex > -1) {
			const input = inputsRef.value?.children.item(firstIndex)
				?.firstChild as HTMLInputElement;
			input.focus();
		}
	});
};

const deleteAll = () => {
	letters.value.fill('');
	selectedPath.value = [];
	focusFirstEmptyInput();
};

const onDelete = (n: number) => {
	if (n == 0) return;
	if (!letters.value[n]) letters.value[n - 1] = '';
	letters.value[n] = '';
	focusFirstEmptyInput();
};

const deleteWord = () => {
	selectedPath.value.forEach((v) => onDelete(v));
	selectedPath.value = [];
};

onKeyStroke(['Control'], () => deleteAll());
onKeyStroke(['Enter'], () => deleteWord());

onMounted(() => focusFirstEmptyInput());

const colorButton = (score: number) =>
	score >= 7 ? 'success' : score >= 5 ? 'warning' : 'error';
</script>
