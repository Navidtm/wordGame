// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

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
  }
});
