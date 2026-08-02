import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths()
  ],
  publicDir: 'public',
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/public/images/**', '**/.git/**']
    }
  }
});
