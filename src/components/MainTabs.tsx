import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '@/context/storeContext';
import QuestionsPage from '@/pages/QuestionsPage';
import DictionaryPage from '@/pages/DictionaryPage';
import { isTab, TABS } from '@/constants/tabs';

const MainTabs: React.FC = () => {
  const { testStore: store } = useStoreContext();

  const handleSelect = (key: string | null) => {
    if (isTab(key)) store.setActiveTab(key);
  };

  return (
    <Tabs
      activeKey={store.activeTab}
      onSelect={handleSelect}
      className="mb-3"
      mountOnEnter
      unmountOnExit
    >
      <Tab eventKey={TABS.TEST} title="Тест">
        <QuestionsPage />
      </Tab>
      <Tab
        eventKey={TABS.DICTIONARY}
        title="Словарь"
        disabled={store.isTestingMode}
      >
        <DictionaryPage />
      </Tab>
    </Tabs>
  );
};

export default observer(MainTabs);
