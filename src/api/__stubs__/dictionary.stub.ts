import { type Verb } from '@/types/verb';

export const verbStub = (overrides?: Partial<Verb>): Verb => ({
  id: '1',
  base: 'go',
  past: 'went',
  pastParticiple: 'gone',
  translation: 'идти',
  ...overrides,
});

export const verbsStub = (count = 3): Verb[] =>
  Array.from({ length: count }, (_, i) =>
    verbStub({
      id: String(i + 1),
      base: `verb${i + 1}`,
      past: `verb${i + 1}-past`,
      pastParticiple: `verb${i + 1}-participle`,
    }),
  );
