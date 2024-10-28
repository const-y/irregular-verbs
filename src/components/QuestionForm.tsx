import { observer } from 'mobx-react-lite';
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';

interface QuestionFormProps {
  disabled: boolean;
  onSubmit: (answer: string) => Promise<void>;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  disabled,
  onSubmit,
}: QuestionFormProps) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit(answer).then(() => {
      if (!answer) {
        return;
      }

      setAnswer('');
      inputRef.current?.focus();
    });
  };

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
        <Button type="submit" disabled={disabled || !answer} size="lg">
          Далее
        </Button>
      </div>
    </Form>
  );
};

export default observer(QuestionForm);
