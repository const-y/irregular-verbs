import { render, fireEvent, screen } from '@testing-library/react';
import { StoreContext } from '@/context/storeContext'; // Предположим, что у вас есть контекст StoreContext
import QuestionsPage from './QuestionsPage';
import Store from '@/store/store';
import '@testing-library/jest-dom';
import { mockDictionary } from '@/test/fixtures/dictionary';
import { getDictionary } from '@/__mocks__/api/dictionary.api';

jest.mock('@/api/dictionary.api');

const createMockStore = () => {
  const store = new Store(getDictionary);
  store.dictionary = mockDictionary;
  return store;
};

describe('QuestionsPage', () => {
  it('отображает сообщение, если нет слов для повторения', async () => {
    const mockStore = createMockStore();

    while (mockStore.dictionary.length > 0) {
      mockStore.dropDictionary();
    }

    render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const noWordsMessage = await screen.findByText('Нет слов для повторения');
    expect(noWordsMessage).toBeInTheDocument();
  });

  it('отображает Progress и AlertBox', async () => {
    const mockStore = createMockStore();

    render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const startButton = await screen.findByRole('button', {
      name: 'Начать тест',
    });
    fireEvent.click(startButton);

    const progress = screen.getByTestId('progress');
    const alertBox = screen.getByTestId('alert-box');

    expect(progress).toBeInTheDocument();
    expect(alertBox).toBeInTheDocument();
  });

  it('отправляет ответ в QuestionForm и вызывает store.checkAnswer', async () => {
    const mockStore = createMockStore();
    const spyOnProcessAnswer = jest.spyOn(mockStore, 'checkAnswer');

    render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>,
    );

    const startButton = await screen.findByText('Начать тест');
    fireEvent.click(startButton);

    const answerInput = await screen.findByTestId('answer-input');
    const submitButton = screen.getByText('Проверить');

    fireEvent.change(answerInput, { target: { value: 'тестовый ответ' } });
    fireEvent.click(submitButton);

    expect(spyOnProcessAnswer).toHaveBeenCalledWith('тестовый ответ');
  });
});
