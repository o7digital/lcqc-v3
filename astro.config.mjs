import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

console.log('Forzando redeploy limpio desde astro.config.mjs');

export default defineConfig({
  site: 'https://www.lacasaquecanta.com',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es'
        }
      },
      filter: (page) => !page.includes('/aprove/') && !page.includes('/admin/')
    })
  ],
  output: 'static',

  // 🔹 Alias de rutas para que Vercel y Astro resuelvan correctamente
  vite: {
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@lib': '/src/lib'
      }
    }
  }
});
