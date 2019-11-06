import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Alert, Form } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Учим неправильные глаголы</h1>
        <p>
          Введите перевод в трех формах через пробел
        </p>
        <p>
          <Alert variant="primary">
            Ездить (верхом)
          </Alert>
          <Form.Control placeholder="Введите перевод в трех формах через пробел" />
        </p>
        <Button>
          Далее
        </Button>
      </Container>
    </div>
  );
}

export default App;
