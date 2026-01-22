export interface Progress {
  strength: number;
  success: number;
  fail: number;
  lastSeen: number;
}

const STORAGE_KEY = 'verbs-progress';

export function loadProgress(): Record<string, Progress> {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

export function saveProgress(id: string, progress: Progress) {
  const all = loadProgress();
  all[id] = progress;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getProgress(id: string): Progress {
  const all = loadProgress();

  return (
    all[id] ?? {
      strength: 0,
      success: 0,
      fail: 0,
      lastSeen: 0,
    }
  );
}
