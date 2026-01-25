export interface Verb {
  id: string;
  base: string;
  past: string;
  pastParticiple: string;
  translation: string;
}

export type VerbForm = 'base' | 'past' | 'pastParticiple';
