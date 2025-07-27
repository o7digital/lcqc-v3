import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


export default defineConfig({
  site: 'https://lcqc.vercel.app',
  integrations: [
    tailwind(),
    tinaPlugin({                 // 👈 Agrega esta sección
      clientId: '47bc5fe7-6887-4669-a245-f6c384126521',
      branch: 'main',
    }),
  ],
  output: 'static',
});
