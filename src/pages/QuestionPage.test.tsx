import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StoreContext } from '../context/storeContext'; // Предположим, что у вас есть контекст StoreContext
import QuestionsPage from './QuestionsPage';
import Store from '../store/store';
import '@testing-library/jest-dom';

const createMockStore = () => {
  const store = new Store();
  return store;
};

describe('QuestionsPage', () => {
  it('отображает сообщение, если нет слов для повторения', () => {
    const mockStore = createMockStore();

    while (mockStore.dictionary.length > 0) {
      mockStore.dropDictionary();
    }

    const { getByText } = render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>
    );

    const noWordsMessage = getByText('Нет слов для повторения');
    expect(noWordsMessage).toBeInTheDocument();
  });

  it('отображает Progress и AlertBox', () => {
    const mockStore = createMockStore();

    const { getByTestId, getByText } = render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>
    );

    const startButton = getByText('Начать тест');
    fireEvent.click(startButton);

    const progress = getByTestId('progress');
    const alertBox = getByTestId('alert-box');

    expect(progress).toBeInTheDocument();
    expect(alertBox).toBeInTheDocument();
  });

  it('отправляет ответ в QuestionForm и вызывает store.checkAnswer', () => {
    const mockStore = createMockStore();
    const spyOnProcessAnswer = jest.spyOn(mockStore, 'checkAnswer');

    const { getByTestId, getByText } = render(
      <StoreContext.Provider value={mockStore}>
        <QuestionsPage />
      </StoreContext.Provider>
    );

    const startButton = getByText('Начать тест');
    fireEvent.click(startButton);

    const answerInput = getByTestId('answer-input');
    const submitButton = getByText('Проверить');

    fireEvent.change(answerInput, { target: { value: 'тестовый ответ' } });
    fireEvent.click(submitButton);

    expect(spyOnProcessAnswer).toHaveBeenCalledWith('тестовый ответ');
  });
});
