import { TABS } from '@/constants/tabs';
import { useStore } from '@/context/storeContext';
import useSelectedVerbsCount from '@/hooks/useSelectedVerbsCount';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

const SelectedVerbsBar = () => {
  const { uiStore } = useStore();
  const count = useSelectedVerbsCount();

  const handleStart = () => {
    uiStore.setActiveTab(TABS.TEST);
  };

  return (
    <div className="d-flex align-items-center justify-content-between py-2 mb-2">
      <div>Выбрано глаголов: {count}</div>
      <div>
        <Button disabled={!count} onClick={handleStart}>
          Перейти к тесту
        </Button>
      </div>
    </div>
  );
};

export default observer(SelectedVerbsBar);
