import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

console.log('Forzando redeploy limpio desde astro.config.mjs');

export default defineConfig({
  site: 'https://lcqc.vercel.app',
  integrations: [
    tailwind()
  ],
  output: 'static',
});
