// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },

	modules: [
		'@vueuse/nuxt',
		'@nuxt/test-utils',
		'@unocss/nuxt',
		'@nuxt/fonts',
		'@nuxt/icon',
	],

	ssr: true,

	css: ['~/assets/css/main.css'],

	devServer: {
		port: 3001,
	},

	experimental: {
		viteEnvironmentApi: true,
		typescriptPlugin: true,
		typedPages: true,
	},

	vite: {
		optimizeDeps: {
			include: ['es-toolkit'],
		},
	},

	fonts: {
		provider: 'local',
		assets: {
			strategy: 'public',
		},
		families: [
			{
				provider: 'local',
				name: 'iransans',
				weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
			},
		],
	},
});
