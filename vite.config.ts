import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-router')) return 'router-vendor';
            if (id.includes('@testing-library')) return 'testing-vendor';
            if (id.includes('tailwindcss')) return 'tailwind-vendor';
            if (id.includes('json-server')) return 'json-server-vendor';
            // Group all other node_modules by top-level package for better caching
            const match = id.match(/node_modules\/([^/]+)/);
            if (match) return `vendor-${match[1]}`;

            return 'vendor';
          }
          // Optionally, split your own code by feature or folder
          if (id.includes('/src/components/')) {
            const match = id.match(/src\/components\/([^/]+)/);
            if (match) return `component-${match[1]}`;
          }
          if (id.includes('/src/utils/')) {
            return 'utils';
          }
          if (id.includes('/src/api/')) {
            return 'api';
          }
          if (id.includes('/src/hooks/')) {
            return 'hooks';
          }
          if (id.includes('/src/logic/')) {
            return 'logic';
          }
          if (id.includes('/src/helpers/')) {
            return 'helpers';
          }
          if (id.includes('/src/types/')) {
            return 'types';
          }
        },
      },
    },
  },

  server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
});
