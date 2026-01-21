import { observer } from 'mobx-react-lite';
import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStoreContext } from '@/context/storeContext';

interface QuestionFormProps {
  disabled: boolean;
  onSubmit: (answer: string) => void;
  onNext: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  disabled,
  onSubmit,
  onNext,
}: QuestionFormProps) => {
  const [answer, setAnswer] = useState('');
  const store = useStoreContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit(answer);
  };

  const handleNext = () => {
    onNext();
    setAnswer('');
  };

  useEffect(() => {
    if (store.isAnswered) {
      nextButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [store.isAnswered]);

  const handleAnswerChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setAnswer(event.target.value);

  return (
    <Form onSubmit={handleSubmit} data-testid="question-form">
      <Form.Control
        ref={inputRef}
        data-testid="answer-input"
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Введите перевод в трех формах через пробел"
        disabled={disabled}
        className="mb-3"
      />
      <div className="text-center m-3">
        {store.isAnswered ? (
          <Button size="lg" onClick={handleNext} ref={nextButtonRef}>
            Далее
          </Button>
        ) : (
          <Button type="submit" disabled={disabled || !answer} size="lg">
            Проверить
          </Button>
        )}
      </div>
    </Form>
  );
};

export default observer(QuestionForm);
