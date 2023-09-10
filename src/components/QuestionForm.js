import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { StoreContext } from '../context/storeContext';

function QuestionForm() {
  const store = useContext(StoreContext);
  const [answer, setAnswer] = useState('');
  const inputRef = useRef(null);
  const disabled = store.isSuccess || !!store.errorMessage;

  const handleSubmit = (event) => {
    event.preventDefault();
    store.processAnswer(answer).then(() => {
      setAnswer('');
      inputRef.current.focus();
    });
  };

  const handleAnswerChange = (event) => {
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
