<template>
	<div
		class="border-px border-white/20 rounded-md w-full max-w-xl relative flex flex-col justify-between bg-[#111312]"
	>
		<div class="absolute top-4 left-4 text-xs px-2 py-1">
			<slot name="toolbar"></slot>
		</div>

		<div class="h-60"></div>
		<slot />
	</div>
</template>
