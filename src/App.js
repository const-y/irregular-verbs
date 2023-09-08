import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Учим неправильные глаголы</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Container>
        <QuestionForm />
      </Container>
    </div>
  );
}

export default App;
