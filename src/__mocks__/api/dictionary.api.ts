import { type Verb } from '@/types/verb';

const mockDictionary: Verb[] = [
  {
    id: 'meet',
    base: 'meet',
    past: 'met',
    pastParticiple: 'met',
    translation: 'встречать',
  },
  {
    id: 'feed',
    base: 'feed',
    past: 'fed',
    pastParticiple: 'fed',
    translation: 'кормить',
  },
  {
    id: 'lead',
    base: 'lead',
    past: 'led',
    pastParticiple: 'led',
    translation: 'вести',
  },
  {
    id: 'read',
    base: 'read',
    past: 'read',
    pastParticiple: 'read',
    translation: 'читать',
  },
];

export const getDictionary = async (): Promise<Verb[]> => {
  return mockDictionary;
};
