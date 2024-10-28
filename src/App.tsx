import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Navbar, Tab, Tabs } from 'react-bootstrap';
import QuestionsPage from './pages/QuestionsPage';
import DictionaryPage from './pages/DictionaryPage';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from './context/storeContext';

const App: React.FC = () => {
  const store = useStoreContext();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Учим неправильные глаголы</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Tabs
          defaultActiveKey="test"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="test" title="Тест">
            <QuestionsPage />
          </Tab>
          <Tab
            eventKey="dictionary"
            title="Словарь"
            disabled={store.isTestingMode}
          >
            <DictionaryPage />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default observer(App);
