import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { StoreContext } from '../context/storeContext';

function Progress() {
  const store = useContext(StoreContext);

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
