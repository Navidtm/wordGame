// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@vueuse/nuxt'],

  ssr: false,

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 3001
  },

  future: {
    compatibilityVersion: 4
  },

  nitro: {
    preset: 'bun',
    experimental: {
      openAPI: true
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  fonts: {
    provider: 'local',
    assets: {
      strategy: 'public'
    },
    families: [
      {
        provider: 'local',
        name: 'iransans',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    ]
  }
});
