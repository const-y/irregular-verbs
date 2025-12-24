export const TABS = {
  TEST: 'test',
  DICTIONARY: 'dictionary',
} as const;

export type Tab = (typeof TABS)[keyof typeof TABS];

export function isTab(value: string | null): value is Tab {
  return Object.values(TABS).includes(value as Tab);
}
