import { render, fireEvent, waitFor } from '@testing-library/react';
import QuestionForm from './QuestionForm';
import '@testing-library/jest-dom';
import noop from 'lodash/noop';
import { StoreContext } from '@/context/storeContext';
import Store from '@/store/store';
import { getDictionary } from '@/__mocks__/api/dictionary.api';

const mockSubmit = jest.fn();

const renderQuestionForm = (disabled = false) => {
  const mockStore = new Store(getDictionary);
  return render(
    <StoreContext.Provider value={mockStore}>
      <QuestionForm disabled={disabled} onSubmit={mockSubmit} onNext={noop} />
    </StoreContext.Provider>,
  );
};

describe('QuestionForm', () => {
  it('отображает форму и кнопку', () => {
    const { getByPlaceholderText, getByText } = renderQuestionForm();
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел',
    );
    const buttonElement = getByText('Проверить');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('вызывает onSubmit с введенным ответом при отправке формы', async () => {
    mockSubmit.mockImplementation(() => Promise.resolve());
    const { getByPlaceholderText, getByText } = renderQuestionForm();
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел',
    );
    const buttonElement = getByText('Проверить');

    fireEvent.change(inputElement, { target: { value: 'ответ' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith('ответ');
    });
  });

  it('отключает форму и кнопку в случае, если disabled === true', () => {
    const { getByPlaceholderText, getByText } = renderQuestionForm(true);
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел',
    );

    const buttonElement = getByText('Проверить');

    expect(inputElement).toBeDisabled();
    expect(buttonElement).toBeDisabled();
  });
});
