import {
  getDictionary,
  getEmptyDictionary,
} from '@/__mocks__/api/dictionary.api';
import { StoreContext } from '@/context/storeContext';
import Store from '@/store/store';
import type { Verb } from '@/types/verb';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import QuestionsPage from './QuestionsPage';

vi.mock('@/api/dictionary.api');

const createMockStore = (isEmpty: boolean = false, verbs: Verb[] = []) => {
  const store = new Store(isEmpty ? getEmptyDictionary : getDictionary);
  return store;
};

describe('QuestionsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает сообщение, если нет слов для повторения', async () => {
    const mockStore = createMockStore(true);

    console.log(mockStore.dictionary);

    const page = await render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const noWordsMessage = page.getByText(/нет слов для повторения/i);

    await expect.element(noWordsMessage).toBeInTheDocument();
  });

  it('отображает Progress и AlertBox', async () => {
    const mockStore = createMockStore();

    const { getByRole, getByTestId } = await render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const startButton = await getByRole('button', {
      name: 'Начать тест',
    });

    await userEvent.click(startButton);

    const progress = getByTestId('progress');
    const alertBox = getByTestId('alert-box');

    expect(progress).toBeInTheDocument();
    expect(alertBox).toBeInTheDocument();
  });

  it('отправляет ответ в QuestionForm и вызывает store.checkAnswer', async () => {
    const mockStore = createMockStore();
    const spyOnProcessAnswer = vi.spyOn(mockStore, 'checkAnswer');

    const { getByText, getByTestId, getByRole } = await render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const startButton = getByText('Начать тест');
    await userEvent.click(startButton);

    const answerInput = getByTestId('answer-input');
    const submitButton = getByRole('button', { name: /проверить/i });

    await userEvent.fill(answerInput, 'тестовый ответ');
    await userEvent.click(submitButton);

    expect(spyOnProcessAnswer).toHaveBeenCalledWith('тестовый ответ');
  });
});
