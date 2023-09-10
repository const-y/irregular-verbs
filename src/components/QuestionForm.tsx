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

function QuestionForm({ disabled, onSubmit }: QuestionFormProps) {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit(answer).then(() => {
      setAnswer('');
      inputRef.current?.focus();
    });
  };

  const handleAnswerChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setAnswer(event.target.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        ref={inputRef}
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Введите перевод в трех формах через пробел"
        disabled={disabled}
        className="mb-3"
      />
      <Button type="submit" disabled={disabled}>
        Далее
      </Button>
    </Form>
  );
}

export default observer(QuestionForm);
