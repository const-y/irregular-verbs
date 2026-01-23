import type { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Preloader: FC = () => {
  return (
    <div data-testid="preloader" className="d-flex justify-content-center">
      <Spinner animation="border" variant="secondary" />
    </div>
  );
};

export default Preloader;
