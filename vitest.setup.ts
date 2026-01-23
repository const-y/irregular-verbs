import { vi } from 'vitest';

vi.stubGlobal(
  'fetch',
  vi.fn(() => Promise.reject(new Error('❌ Реальный HTTP запрещён'))),
);
