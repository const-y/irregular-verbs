import { observer } from 'mobx-react-lite';
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStoreContext } from '../context/storeContext';

function QuestionForm() {
  const store = useStoreContext();
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const disabled = store.isSuccess || !!store.errorMessage;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    store.processAnswer(answer).then(() => {
      setAnswer('');
      inputRef.current?.focus();
    });
  };

  const handleAnswerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAnswer(event.target.value);
  };

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
