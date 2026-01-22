import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import QuestionsPage from './QuestionsPage';
import { render } from '@/test/test-uitls';
import Store from '@/store/store';
import { mockDictionary } from '@/test/fixtures/dictionary';

vi.mock('@/api/dictionary.api');

describe('QuestionsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает сообщение, если нет слов для повторения', async () => {
    const page = await render(<QuestionsPage />);

    const noWordsMessage = page.getByText(/нет слов для повторения/i);

    await expect.element(noWordsMessage).toBeInTheDocument();
  });

  it('отображает Progress и AlertBox', async () => {
    const mockStore = new Store();
    mockStore.setDictionary(mockDictionary);

    const page = await render(<QuestionsPage />, { store: mockStore });

    const startButton = page.getByRole('button', {
      name: 'Начать тест',
    });

    await userEvent.click(startButton);

    const progress = page.getByTestId('progress');
    const alertBox = page.getByTestId('alert-box');

    expect(progress).toBeInTheDocument();
    expect(alertBox).toBeInTheDocument();
  });

  it('отправляет ответ в QuestionForm и вызывает store.checkAnswer', async () => {
    const mockStore = new Store();
    mockStore.setDictionary(mockDictionary);
    const spyOnProcessAnswer = vi.spyOn(mockStore, 'checkAnswer');

    const page = await render(<QuestionsPage />, { store: mockStore });

    const startButton = page.getByRole('button', { name: /начать тест/i });
    await userEvent.click(startButton);

    const answerInput = page.getByTestId('answer-input');
    const submitButton = page.getByRole('button', { name: /проверить/i });

    await userEvent.fill(answerInput, 'тестовый ответ');
    await userEvent.click(submitButton);

    expect(spyOnProcessAnswer).toHaveBeenCalledWith('тестовый ответ');
  });
});
