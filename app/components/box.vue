<template>
	<div
		class="border-px border-white/20 rounded-md w-full max-w-xl p-4 relative flex flex-col justify-between bg-[#111312]"
	>
		<div class="absolute top-4 left-4 text-xs p-1 flex gap-4">
			<slot name="toolbar"></slot>
		</div>

		<div class="h-10"></div>
		<slot />
		<div class="h-10"></div>
	</div>
</template>
