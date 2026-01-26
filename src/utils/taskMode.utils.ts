import type { TaskMode } from '@/types/test';
import { getRandomItem } from '@/utils/array';

export function getRandomTaskMode(
  getRandom: () => number = Math.random,
): TaskMode {
  const modes: TaskMode[] = ['translateToForms', 'missingForm'];
  return getRandomItem(modes, getRandom) as TaskMode;
}
