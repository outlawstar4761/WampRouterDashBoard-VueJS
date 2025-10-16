import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

import vue from '@vitejs/plugin-vue2';

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(pathSegments, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  }
})
