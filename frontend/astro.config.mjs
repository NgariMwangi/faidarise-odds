import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 150,
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
      allowedHosts: ['measure-aquatic-beings-jurisdiction.trycloudflare.com'], // 👈 Add this line
    },
  },
});
