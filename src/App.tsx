import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import MainTabs from './components/MainTabs';

const App: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Учим неправильные глаголы</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <MainTabs />
      </Container>
    </>
  );
};

export default App;
