import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

const QuestionForm = () => {
  return (
    <Form>
      <p>
        <Alert variant="primary">
          Ездить (верхом)
        </Alert>
        <Form.Control placeholder="Введите перевод в трех формах через пробел" />
      </p>
      <Button>
        Далее
      </Button>
    </Form>
  );
};

export default QuestionForm;
