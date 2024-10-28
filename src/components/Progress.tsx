import { observer } from 'mobx-react-lite';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useStoreContext } from '../context/storeContext';

const Progress: React.FC = () => {
  const store = useStoreContext();

  return (
    <ProgressBar
      data-testid="progress"
      striped
      variant="success"
      now={store.percents}
    />
  );
};

export default observer(Progress);
