import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  root: fs.realpathSync.native(path.resolve('./')),
  plugins: [react()],
  base: '/soner-portfolio/',
})
