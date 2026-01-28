import { render } from 'vitest-browser-react';
import QuestionForm from './QuestionForm';
import noop from 'lodash/noop';
import { StoreContext } from '@/context/storeContext';
import { vi, describe, expect, it, beforeEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { RootStore } from '@/store/RootStore';

const mockSubmit = vi.fn();
const mockGetRandom = vi.fn(() => 0);

const renderQuestionForm = (disabled = false) => {
  const mockStore = new RootStore(mockGetRandom);
  return render(
    <StoreContext.Provider value={mockStore}>
      <QuestionForm disabled={disabled} onSubmit={mockSubmit} onNext={noop} />
    </StoreContext.Provider>,
  );
};

describe('QuestionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('должен вызвать onSubmit c пустой строкой при нажатии на кнопку "Пропустить"', async () => {
    const screen = await renderQuestionForm();
    const inputElement = screen.getByPlaceholder(/введите перевод/i);
    await userEvent.fill(inputElement, 'ответ');
    await userEvent.click(screen.getByRole('button', { name: /пропустить/i }));

    expect(mockSubmit).toHaveBeenCalledWith('');
  });
});
