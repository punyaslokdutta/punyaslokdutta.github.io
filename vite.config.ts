import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: {},
    host: true // This makes the server accessible from other devices
  },
});
