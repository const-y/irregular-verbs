import { useStoreContext } from '@/context/storeContext';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { Alert } from 'react-bootstrap';

const AlertBox: FC = () => {
  const store = useStoreContext();

  if (store.isSuccess) {
    return (
      <Alert data-testid="alert-box" variant="success">
        Верно!
      </Alert>
    );
  }
  if (store.errorMessage) {
    return (
      <Alert data-testid="alert-box" variant="danger">
        {store.errorMessage}
      </Alert>
    );
  }

  return (
    <Alert data-testid="alert-box" variant="primary">
      {store.taskDescription}
    </Alert>
  );
};

export default observer(AlertBox);
