import { render } from 'vitest-browser-react';
import QuestionForm from './QuestionForm';
import noop from 'lodash/noop';
import { StoreContext } from '@/context/storeContext';
import Store from '@/store/store';
import { vi, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';

const mockSubmit = vi.fn();

const renderQuestionForm = (disabled = false) => {
  const mockStore = new Store();
  return render(
    <StoreContext.Provider value={mockStore}>
      <QuestionForm disabled={disabled} onSubmit={mockSubmit} onNext={noop} />
    </StoreContext.Provider>,
  );
};

describe('QuestionForm', () => {
  it('отображает форму и кнопку', async () => {
    const { getByPlaceholder, getByText } = await renderQuestionForm();
    const inputElement = getByPlaceholder(
      'Введите перевод в трех формах через пробел',
    );
    const buttonElement = getByText('Проверить');

    await expect.element(inputElement).toBeInTheDocument();
    await expect.element(buttonElement).toBeInTheDocument();
  });

  it('вызывает onSubmit с введенным ответом при отправке формы', async () => {
    mockSubmit.mockImplementation(() => Promise.resolve());
    const { getByPlaceholder, getByText } = await renderQuestionForm();
    const inputElement = getByPlaceholder(
      'Введите перевод в трех формах через пробел',
    );
    const buttonElement = getByText('Проверить');

    await userEvent.fill(inputElement, 'ответ');
    await userEvent.click(buttonElement);

    expect(mockSubmit).toHaveBeenCalledWith('ответ');
  });

  it('отключает форму и кнопку в случае, если disabled === true', async () => {
    const { getByPlaceholder, getByText } = await renderQuestionForm(true);
    const inputElement = getByPlaceholder(
      'Введите перевод в трех формах через пробел',
    );

    const buttonElement = getByText('Проверить');

    await expect.element(inputElement).toBeDisabled();
    await expect.element(buttonElement).toBeDisabled();
  });
});
