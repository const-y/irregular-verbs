import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertBox({ sampler, success, error }) {
  if (success) {
    return <Alert variant="success">Верно!</Alert>;
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return <Alert variant="primary">{sampler[3]}</Alert>;
}

export default AlertBox;
