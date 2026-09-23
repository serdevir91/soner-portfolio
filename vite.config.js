import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig(({ command }) => ({
  // The OneDrive workspace resolves through D:\Code. Rollup needs the real path
  // for output names, while the dev optimizer must use the working directory.
  root: command === 'build' ? fs.realpathSync.native(path.resolve('./')) : undefined,
  plugins: [react()],
  base: '/soner-portfolio/',
}))
