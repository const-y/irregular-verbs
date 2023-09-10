import React from 'react';
import { Alert } from 'react-bootstrap';
import { DictionaryItem } from '../models/DictionaryItem';

interface AlertBoxProps {
  sampler: DictionaryItem;
  success: boolean;
  error: string;
}

function AlertBox({ sampler, success, error }: AlertBoxProps) {
  if (success) {
    return <Alert variant="success">Верно!</Alert>;
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return <Alert variant="primary">{sampler[3]}</Alert>;
}

export default AlertBox;
