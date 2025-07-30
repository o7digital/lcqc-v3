import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

console.log('Forzando redeploy limpio desde astro.config.mjs');

export default defineConfig({
  site: 'https://lcqc2.vercel.app',  // 🔹 URL corregida
  integrations: [
    tailwind()
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
