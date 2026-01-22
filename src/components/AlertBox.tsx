import { Alert } from 'react-bootstrap';

interface AlertBoxProps {
  translate: string;
  success: boolean;
  error: string;
}

function AlertBox({ translate, success, error }: AlertBoxProps) {
  if (success) {
    return (
      <Alert data-testid="alert-box" variant="success">
        Верно!
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert data-testid="alert-box" variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <Alert data-testid="alert-box" variant="primary">
      {translate}
    </Alert>
  );
}

export default AlertBox;
