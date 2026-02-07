import { TABS } from '@/constants/tabs';
import { getProgress, saveProgress } from '@/storage/progress.storage';
import { RootStore } from '@/store/RootStore';
import TestStore from '@/store/TestStore';
import type { Verb } from '@/types/verb';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/storage/progress.storage', () => ({
  getProgress: vi.fn(),
  saveProgress: vi.fn(),
}));

vi.mock('@/utils/array', () => ({
  getRandomItem: vi.fn(),
}));

vi.mock('@/utils/taskMode.utils', () => ({
  getRandomTaskMode: vi.fn(),
}));

describe('TestStore', () => {
  let rootStore: RootStore;
  let testStore: TestStore;
  let mockUiStore: any;
  const mockRandom = vi.fn();

  const verbs: Verb[] = [
    {
      id: '1',
      base: 'go',
      past: 'went',
      pastParticiple: 'gone',
      translation: 'идти',
    },
    {
      id: '2',
      base: 'eat',
      past: 'ate',
      pastParticiple: 'eaten',
      translation: 'есть',
    },
    {
      id: '3',
      base: 'see',
      past: 'saw',
      pastParticiple: 'seen',
      translation: 'видеть',
    },
  ];

  beforeEach(() => {
    mockUiStore = {
      setActiveTab: vi.fn(),
    };

    rootStore = {
      uiStore: mockUiStore,
      settingsStore: {
        isVerbDisabled: vi.fn().mockReturnValue(false),
      },
      getRandom: mockRandom,
    } as unknown as RootStore;

    testStore = new TestStore(rootStore);

    vi.clearAllMocks();
    vi.mocked(getProgress).mockImplementation((id) => ({
      success: 0,
      fail: 0,
      strength: 0.5,
      lastSeen: 0,
    }));
  });

  describe('Конструктор и начальное состояние', () => {
    it('должен корректно инициализировать store', () => {
      expect(testStore.dictionary).toEqual([]);
      expect(testStore.initialLength).toBe(0);
      expect(testStore.isSuccess).toBe(false);
      expect(testStore.errorMessage).toBe('');
      expect(testStore.isTestingMode).toBe(false);
      expect(testStore.taskMode).toBe('translateToForms');
    });
  });

  describe('Геттеры', () => {
    it('activeVerb должен возвращать первый глагол из словаря или null', () => {
      testStore.dictionary = verbs;
      expect(testStore.activeVerb).toEqual(verbs[0]);

      testStore.dictionary = [];
      expect(testStore.activeVerb).toBeNull();
    });

    it('completionPercent должен корректно считать процент выполнения', () => {
      testStore.initialLength = 10;
      testStore.dictionary = verbs; // 3 глагола
      testStore.completedCount = 7;

      expect(testStore.completionPercent).toBe(70);

      testStore.initialLength = 0;
      expect(testStore.completionPercent).toBe(0);
    });

    it('isAnswered должен быть true, если есть успех или ошибка', () => {
      testStore.isSuccess = true;
      expect(testStore.isAnswered).toBe(true);

      testStore.isSuccess = false;
      testStore.errorMessage = 'Ошибка';
      expect(testStore.isAnswered).toBe(true);

      testStore.errorMessage = '';
      expect(testStore.isAnswered).toBe(false);
    });

    it('taskDescription должен возвращать перевод или "Заполните пропуск"', () => {
      testStore.dictionary = [verbs[0]];
      testStore.taskMode = 'translateToForms';
      expect(testStore.taskDescription).toBe('идти');

      testStore.taskMode = 'missingForm';
      expect(testStore.taskDescription).toBe('Заполните пропуск');
    });
  });

  describe('Проверка ответа', () => {
    beforeEach(() => {
      testStore.dictionary = [verbs[0]];
    });

    it('isAnswerCorrect должен проверять правильность полного ответа', () => {
      expect(testStore.isAnswerCorrect('go went gone')).toBe(true);
      expect(testStore.isAnswerCorrect('Go Went Gone')).toBe(true);
      expect(testStore.isAnswerCorrect('go went go')).toBe(false);
      expect(testStore.isAnswerCorrect('')).toBe(false);

      testStore.dictionary = [];
      expect(testStore.isAnswerCorrect('go went gone')).toBe(false);
    });

    it('checkAnswer должен сохранять прогресс при правильном ответе', () => {
      const progress = { success: 0, fail: 0, strength: 0.5, lastSeen: 0 };
      vi.mocked(getProgress).mockReturnValue(progress);

      testStore.checkAnswer('go went gone');

      expect(testStore.isSuccess).toBe(true);
      expect(testStore.errorMessage).toBe('');
      expect(saveProgress).toHaveBeenCalledWith('1', {
        ...progress,
        success: 1,
        strength: 0.65,
        lastSeen: expect.any(Number),
      });
    });

    it('checkAnswer должен показывать ошибку и снижать силу при неправильном ответе', () => {
      const progress = { success: 0, fail: 0, strength: 0.5, lastSeen: 0 };
      vi.mocked(getProgress).mockReturnValue(progress);

      testStore.checkAnswer('wrong answer');

      expect(testStore.isSuccess).toBe(false);
      expect(testStore.errorMessage).toBe('go went gone - идти');
      expect(saveProgress).toHaveBeenCalledWith('1', {
        ...progress,
        fail: 1,
        strength: 0.25,
        lastSeen: expect.any(Number),
      });
    });

    it('checkAnswer не должен ничего делать, если нет активного глагола', () => {
      testStore.dictionary = [];
      testStore.checkAnswer('any answer');
      expect(saveProgress).not.toHaveBeenCalled();
    });
  });

  describe('Управление режимом тестирования', () => {
    it('setIsTestingMode должен переключать режим и управлять UI', () => {
      testStore.setIsTestingMode(true);
      expect(testStore.isTestingMode).toBe(true);
      expect(mockUiStore.setActiveTab).toHaveBeenCalledWith(TABS.TEST);

      testStore.setIsTestingMode(false);
      expect(testStore.isTestingMode).toBe(false);
      expect(testStore.initialLength).toBe(0);
      expect(testStore.isSuccess).toBe(false);
      expect(testStore.errorMessage).toBe('');
    });
  });

  describe('Работа с вопросами', () => {
    beforeEach(() => {
      testStore.dictionary = [...verbs];
    });

    it('nextQuestion должен убирать глагол при успехе и перемешивать при ошибке', () => {
      const originalLength = testStore.dictionary.length;

      testStore.isSuccess = true;
      testStore.nextQuestion();
      expect(testStore.dictionary.length).toBe(originalLength - 1);

      testStore.isSuccess = false;
      testStore.errorMessage = 'Ошибка';
      const spy = vi.spyOn(testStore, 'shuffleDictionary');
      testStore.nextQuestion();
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('Инициализация словаря', () => {
    it('setDictionary должен фильтровать отключённые глаголы', () => {
      vi.mocked(rootStore.settingsStore.isVerbDisabled)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false);

      testStore.setDictionary(verbs);
      expect(testStore.dictionary).toEqual([verbs[1], verbs[2]]);
      expect(testStore.initialLength).toBe(2);
    });
  });

  describe('Пограничные случаи', () => {
    it('dropDictionary должен безопасно работать с пустым массивом', () => {
      testStore.dictionary = [];
      testStore.dropDictionary();
      expect(testStore.dictionary).toEqual([]);
    });

    it('shuffleDictionary должен работать с пустым массивом', () => {
      testStore.dictionary = [];
      testStore.shuffleDictionary();
      expect(testStore.dictionary).toEqual([]);
    });

    it('completionPercent должен быть 100% при завершении', () => {
      testStore.initialLength = 3;
      testStore.completedCount = 3;
      testStore.dictionary = [];
      expect(testStore.completionPercent).toBe(100);
    });

    it('completionPercent должен быть 0 при initialLength = 0', () => {
      testStore.initialLength = 0;
      testStore.dictionary = [];
      expect(testStore.completionPercent).toBe(0);
    });

    it('checkAnswer не должен падать при пустом activeVerb', () => {
      testStore.dictionary = [];
      expect(() => testStore.checkAnswer('test')).not.toThrow();
    });

    it('nextQuestion не должен падать при пустом словаре', () => {
      testStore.dictionary = [];
      expect(() => testStore.nextQuestion()).not.toThrow();
    });
  });
});
