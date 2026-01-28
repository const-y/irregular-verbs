import { observer } from 'mobx-react-lite';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useStore } from '@/context/storeContext';

const Progress: React.FC = () => {
  const { testStore } = useStore();

  return (
    <ProgressBar
      data-testid="progress"
      striped
      variant="success"
      now={testStore.completionPercent}
    />
  );
};

export default observer(Progress);
