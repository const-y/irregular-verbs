import SettingsStore from '@/store/SettingsStore';
import {
  loadDisabledVerbs,
  saveDisabledVerbs,
} from '@/storage/disabled-verbs.storage';
import type { Verb } from '@/types/verb';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/store/RootStore';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';

vi.mock('@/storage/disabled-verbs.storage');

class MockRootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

describe('SettingsStore', () => {
  let rootStore: RootStore;
  let settingsStore: SettingsStore;

  beforeEach(() => {
    rootStore = new MockRootStore() as unknown as RootStore;
    vi.mocked(loadDisabledVerbs).mockImplementation(() => new Set<string>());
    vi.mocked(saveDisabledVerbs).mockImplementation(() => {});

    settingsStore = new SettingsStore(rootStore);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Конструктор и инициализация', () => {
    it('должен создать экземпляр и загрузить отключённые глаголы', () => {
      expect(settingsStore).toBeDefined();
      expect(loadDisabledVerbs).toHaveBeenCalled();
    });

    it('должен установить disabledVerbs из хранилища', () => {
      vi.mocked(loadDisabledVerbs).mockImplementation(
        () => new Set(['go', 'run']),
      );
      settingsStore = new SettingsStore(rootStore);

      expect(settingsStore.disabledVerbs.has('go')).toBe(true);
      expect(settingsStore.disabledVerbs.has('run')).toEqual(true);
      expect(settingsStore.disabledVerbs.size).toBe(2);
    });
  });

  describe('isVerbDisabled', () => {
    it('должен вернуть true, если глагол отключён', () => {
      settingsStore.disabledVerbs.add('go');
      expect(settingsStore.isVerbDisabled('go')).toBe(true);
    });

    it('должен вернуть false, если глагол включён', () => {
      expect(settingsStore.isVerbDisabled('go')).toBe(false);
    });

    it('должен корректно работать с пустым id', () => {
      expect(settingsStore.isVerbDisabled('')).toBe(false);
      settingsStore.disabledVerbs.add('');
      expect(settingsStore.isVerbDisabled('')).toBe(true);
    });
  });

  describe('toggleVerb', () => {
    it('должен включить глагол, если он был отключён', () => {
      settingsStore.disabledVerbs.add('go');
      settingsStore.toggleVerb('go');
      expect(settingsStore.isVerbDisabled('go')).toBe(false);
    });

    it('должен отключить глагол, если он был включён', () => {
      settingsStore.toggleVerb('go');
      expect(settingsStore.isVerbDisabled('go')).toBe(true);
    });
  });

  describe('enableAllVerbs', () => {
    it('должен очистить disabledVerbs', () => {
      settingsStore.disabledVerbs.add('go');
      settingsStore.disabledVerbs.add('run');
      settingsStore.enableAllVerbs();
      expect(settingsStore.disabledVerbs.size).toBe(0);
    });

    it('должен сохранить пустой массив в хранилище', () => {
      settingsStore.enableAllVerbs();
      expect(saveDisabledVerbs).toHaveBeenCalled();

      const arg = (saveDisabledVerbs as Mock).mock.calls[0][0];
      expect(arg).toMatchInlineSnapshot(`[]`);
    });
  });

  describe('disableVerbs', () => {
    const mockVerbs: Verb[] = [
      {
        id: 'go',
        base: 'go',
        past: 'went',
        pastParticiple: 'gone',
        translation: 'идти',
      },
      {
        id: 'run',
        base: 'run',
        past: 'ran',
        pastParticiple: 'run',
        translation: 'бежать',
      },
    ];

    it('должен добавить все id глаголов в disabledVerbs', () => {
      settingsStore.disableVerbs(mockVerbs);
      expect([...settingsStore.disabledVerbs]).toEqual(['go', 'run']);
    });

    it('должен сохранить новый Set в хранилище', () => {
      settingsStore.disableVerbs(mockVerbs);

      expect(saveDisabledVerbs).toHaveBeenCalled();

      const arg = (saveDisabledVerbs as Mock).mock.calls[0][0];

      expect(arg).toMatchInlineSnapshot(`
        [
          "go",
          "run",
        ]
      `);
    });

    it('должен корректно обрабатывать пустой массив', () => {
      settingsStore.disableVerbs([]);
      expect(settingsStore.disabledVerbs.size).toBe(0);
    });

    it('должен корректно обрабатывать один элемент', () => {
      settingsStore.disableVerbs([mockVerbs[0]]);
      const disabledVerbs = Array.from(settingsStore.disabledVerbs);
      expect(disabledVerbs).toEqual(['go']);
    });
  });

  describe('isAllVerbsEnabled', () => {
    it('должен вернуть true, если нет отключённых глаголов', () => {
      expect(settingsStore.isAllVerbsEnabled).toBe(true);
    });

    it('должен вернуть false, если есть хотя бы один отключённый глагол', () => {
      settingsStore.disabledVerbs.add('go');
      expect(settingsStore.isAllVerbsEnabled).toBe(false);
    });

    it('должен реагировать на изменения в disabledVerbs', () => {
      settingsStore.disabledVerbs.add('go');
      expect(settingsStore.isAllVerbsEnabled).toBe(false);

      settingsStore.disabledVerbs.delete('go');
      expect(settingsStore.isAllVerbsEnabled).toBe(true);
    });
  });
});
