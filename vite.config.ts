import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [react()],
  base: '/verbs/',
  optimizeDeps: {
    include: ['react-dom/client'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'lcov'],
      exclude: ['__stubs__', '**/*.d.ts', 'types/**/*.{ts,tsx}'],
    },
  },
});
