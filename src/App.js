import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import QuestionsPage from './components/QuestionsPage';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Учим неправильные глаголы</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <QuestionsPage />
      </Container>
    </div>
  );
}

export default App;
