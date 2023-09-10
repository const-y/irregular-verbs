import { observer } from 'mobx-react-lite';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useStoreContext } from '../context/storeContext';

function Progress() {
  const store = useStoreContext();

  return (
    <ProgressBar
      striped
      variant="success"
      now={store.percents}
      className="mb-3"
    />
  );
}

export default observer(Progress);
