
import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/astro-page',
  server: {
    host: true,
  },
  vite: {
    preview: {
      allowedHosts: [
        'sylvains-macbook-pro.tailbf013e.ts.net',
        '.tailbf013e.ts.net',
      ],
    },
  },
});
