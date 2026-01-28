import { observer } from 'mobx-react-lite';
import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '@/context/storeContext';
import Actions from './Actions';

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
  const { testStore } = useStore();
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
    if (testStore.isAnswered) {
      nextButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [testStore.isAnswered]);

  const handleAnswerChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setAnswer(event.target.value);

  const handleSkip = () => {
    onSubmit('');
    setAnswer('');
  };

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
      <Actions
        nextButtonRef={nextButtonRef}
        onNextClick={handleNext}
        isSubmitDisabled={disabled || !answer}
        onSkipClick={handleSkip}
      />
    </Form>
  );
};

export default observer(QuestionForm);
