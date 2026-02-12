import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import MainTabs from './components/MainTabs';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="/">
            <ArrowLeft />
          </Navbar.Brand>
          <Navbar.Text>Учим неправильные глаголы</Navbar.Text>
        </Container>
      </Navbar>
      <Container>
        <MainTabs />
      </Container>
    </>
  );
};

export default App;
