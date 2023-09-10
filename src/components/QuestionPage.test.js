import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import QuestionForm from './QuestionForm';
import '@testing-library/jest-dom';

const mockSubmit = jest.fn();

const renderQuestionForm = (disabled = false) => {
  return render(<QuestionForm disabled={disabled} onSubmit={mockSubmit} />);
};

describe('QuestionForm', () => {
  it('отображает форму и кнопку', () => {
    const { getByPlaceholderText, getByText } = renderQuestionForm();
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел'
    );
    const buttonElement = getByText('Далее');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('вызывает onSubmit с введенным ответом при отправке формы', async () => {
    mockSubmit.mockImplementation(() => Promise.resolve());
    const { getByPlaceholderText, getByText } = renderQuestionForm();
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел'
    );
    const buttonElement = getByText('Далее');

    fireEvent.change(inputElement, { target: { value: 'ответ' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith('ответ');
    });
  });

  it('очищает поле ввода и фокусируется после отправки', async () => {
    mockSubmit.mockImplementation(() => Promise.resolve());
    const { getByPlaceholderText } = renderQuestionForm();
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел'
    );

    fireEvent.change(inputElement, { target: { value: 'ответ' } });
    fireEvent.submit(inputElement);

    await waitFor(() => {
      expect(inputElement).toHaveValue('');
      expect(inputElement).toHaveFocus();
    });
  });

  it('отключает форму и кнопку в случае, если disabled === true', () => {
    const { getByPlaceholderText, getByText } = renderQuestionForm(true);
    const inputElement = getByPlaceholderText(
      'Введите перевод в трех формах через пробел'
    );

    const buttonElement = getByText('Далее');

    expect(inputElement).toBeDisabled();
    expect(buttonElement).toBeDisabled();
  });
});
