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
						@keyup.delete="deleteWord(letters[n] ? [n] : [n - 1])"
						@focus="focusFirstEmptyInput()"
						@input="focusFirstEmptyInput()"
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
import { isEmpty } from 'es-toolkit/compat';

const inputsRef = useTemplateRef<HTMLDivElement>('inputsEl');

const selectedPath = ref<number[]>([]);
const letters = ref<string[]>(Array(16));

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

const deleteWord = (path: number[]) => {
	path.forEach((n) => (letters.value[n] = ''));
	selectedPath.value = [];
	focusFirstEmptyInput();
};

onKeyStroke(['Control'], () => deleteWord(range(16)));
onKeyStroke(['Enter'], () => deleteWord(selectedPath.value));

onMounted(() => focusFirstEmptyInput());
</script>
