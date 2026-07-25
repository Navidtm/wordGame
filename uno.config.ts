import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
	presets: [presetWind4()],
	theme: {
		colors: {
			content: {
				muted: '#aeb9bc',
				subtle: '#94a3a8',
				strong: '#d8e0e2',
			},
		},
	},
});
