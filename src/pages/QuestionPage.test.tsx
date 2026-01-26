import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import QuestionsPage from './QuestionsPage';
import { render } from '@/test/test-uitls';
import Store from '@/store/store';
import { verbsStub } from '@/api/__stubs__/dictionary.stub';
import * as dictionaryApi from '@/api/dictionary.api';

vi.mock('@/api/dictionary.api');

describe('QuestionsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает сообщение, если нет слов для повторения', async () => {
    vi.mocked(dictionaryApi.getDictionary).mockResolvedValue([]);
    const screen = await render(<QuestionsPage />);
    await userEvent.click(screen.getByRole('button', { name: /начать тест/i }));

    const noWordsMessage = screen.getByText(/нет слов для повторения/i);

    await expect.element(noWordsMessage).toBeInTheDocument();
  });

  it('отображает Progress и AlertBox', async () => {
    vi.mocked(dictionaryApi.getDictionary).mockResolvedValue(verbsStub(3));
    const mockStore = new Store(() => 0);

    const screen = await render(<QuestionsPage />, { store: mockStore });

    const startButton = screen.getByRole('button', {
      name: /начать тест/i,
    });

    await userEvent.click(startButton);

    const progress = screen.getByTestId('progress');
    const alertBox = screen.getByTestId('alert-box');

    await expect.element(progress).toBeInTheDocument();
    await expect.element(alertBox).toBeInTheDocument();
  });

  it('отправляет ответ в QuestionForm и вызывает store.checkAnswer', async () => {
    vi.mocked(dictionaryApi.getDictionary).mockResolvedValue(verbsStub(3));
    const mockStore = new Store(() => 0);
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
