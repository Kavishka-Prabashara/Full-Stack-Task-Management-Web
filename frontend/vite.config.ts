import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ Official Tailwind Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ Correct usage
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  }
});
