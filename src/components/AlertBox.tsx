import { useStore } from '@/context/storeContext';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { Alert } from 'react-bootstrap';

const AlertBox: FC = () => {
  const { testStore } = useStore();

  if (testStore.isSuccess) {
    return (
      <Alert data-testid="alert-box" variant="success">
        Верно!
      </Alert>
    );
  }
  if (testStore.errorMessage) {
    return (
      <Alert data-testid="alert-box" variant="danger">
        {testStore.errorMessage}
      </Alert>
    );
  }

  return (
    <Alert data-testid="alert-box" variant="primary">
      {testStore.taskDescription}
    </Alert>
  );
};

export default observer(AlertBox);
