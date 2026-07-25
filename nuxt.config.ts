// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: process.env.NODE_ENV === 'development' },

	modules: ['@vueuse/nuxt', '@unocss/nuxt', '@nuxt/icon'],

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
				{
					rel: 'preload',
					href: '/fonts/iransans-300.woff2',
					as: 'font',
					type: 'font/woff2',
					crossorigin: 'anonymous',
				},
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
			],
		},
	},

	routeRules: {
		'/': { prerender: true },
	},

	features: {
		inlineStyles: true,
	},

	css: ['~/assets/css/main.css'],

	experimental: {
		viteEnvironmentApi: true,
		typescriptPlugin: true,
		typedPages: true,
		watcher: 'builder',
	},
});
