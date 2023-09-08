import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { StoreContext } from '../context/storeContext';
import AlertBox from './AlertBox';

function QuestionForm() {
  const store = useContext(StoreContext);
  const [answer, setAnswer] = useState('');
  const inputRef = useRef(null);

  const disabled = store.isSuccess || !!store.errorMessage;

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  if (isEmpty(store.firstDictionaryItem)) {
    return <div>Нет слов для повторения</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    store.processAnswer(answer);
    setAnswer('');
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ProgressBar striped variant="success" now={store.percents} />
      <br />
      <AlertBox
        sampler={store.firstDictionaryItem}
        success={store.isSuccess}
        error={store.errorMessage}
      />
      <p>
        <Form.Control
          ref={inputRef}
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Введите перевод в трех формах через пробел"
          disabled={disabled}
        />
      </p>
      <Button type="submit" disabled={disabled}>
        Далее
      </Button>
    </Form>
  );
}

export default observer(QuestionForm);
