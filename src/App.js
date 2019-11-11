import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import QuestionFormContainer from './components/QuestionFormContainer';

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
        <QuestionFormContainer/>
      </Container>
    </div>
  );
}

export default App;
