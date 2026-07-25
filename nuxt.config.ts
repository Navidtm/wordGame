// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },

	modules: ['@vueuse/nuxt', '@nuxt/test-utils', '@unocss/nuxt', '@nuxt/icon'],

	ssr: true,

	runtimeConfig: {
		public: {
			siteUrl:
				process.env.NUXT_PUBLIC_SITE_URL ||
				(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''),
		},
	},

	app: {
		head: {
			htmlAttrs: { lang: 'fa', dir: 'rtl' },
			titleTemplate: '%s | شکار واژه',
			meta: [
				{ name: 'theme-color', content: '#090d10' },
				{ name: 'color-scheme', content: 'dark' },
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
		},
	},

	routeRules: {
		'/': { prerender: true },
	},

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
