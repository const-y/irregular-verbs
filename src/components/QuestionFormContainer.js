import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

const QuestionFormContainer = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Alert variant="primary">
        Ездить (верхом)
      </Alert>
      <p>
        <Form.Control placeholder="Введите перевод в трех формах через пробел" />
      </p>
      <Button>
        Далее
      </Button>
      <Button variant="secondary">
        Shuffle
      </Button>
    </Form>
  );
};

export default QuestionFormContainer;
