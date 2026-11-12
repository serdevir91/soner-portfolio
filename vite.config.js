import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel serves the site from the domain root. GitHub Pages serves it from
// /soner-portfolio/. BASE_PATH overrides both.
const base = process.env.BASE_PATH || (process.env.VERCEL ? '/' : '/soner-portfolio/');

export default defineConfig({
  plugins: [react()],
  base,
  build: { chunkSizeWarningLimit: 1800 },
});
