const STORAGE_KEY = 'disabled-verbs';

export function loadDisabledVerbs(): Set<string> {
  const saved = localStorage.getItem(STORAGE_KEY);

  return saved
    ? new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    : new Set<string>();
}

export function saveDisabledVerbs(verbs: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...verbs]));
}
