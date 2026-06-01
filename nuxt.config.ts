// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },

	modules: ['@vueuse/nuxt', '@nuxt/test-utils', '@unocss/nuxt', '@nuxt/icon'],

	ssr: false,

	css: ['~/assets/css/main.css'],
	telemetry: false,

	devServer: {
		host: '0',
		port: 3001,
	},

	experimental: {
		viteEnvironmentApi: true,
		typescriptPlugin: true,
		typedPages: true,
	},

	vite: {
		clearScreen: false,
		optimizeDeps: {
			include: ['es-toolkit'],
		},
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			// Tauri requires a consistent port
			strictPort: true,
		},
	},

	ignore: ['**/src-tauri/**'],
});
