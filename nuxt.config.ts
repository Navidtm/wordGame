// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },

	modules: ['@vueuse/nuxt', '@nuxt/test-utils', '@unocss/nuxt', '@nuxt/icon'],

	ssr: false,

	css: ['~/assets/css/main.css'],

	experimental: {
		viteEnvironmentApi: true,
		typescriptPlugin: true,
		typedPages: true,
		watcher: 'builder',
	},

	vite: {
		optimizeDeps: {
			include: ['es-toolkit'],
		},
	},
});
