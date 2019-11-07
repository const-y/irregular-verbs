import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Учим неправильные глаголы</Navbar.Brand>
      </Navbar>
      <br />
      <Container>
        <QuestionForm/>
      </Container>
    </div>
  );
}

export default App;
