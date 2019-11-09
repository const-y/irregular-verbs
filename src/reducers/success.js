import { createReducer } from 'redux-act';
import { hideSuccess, showSuccess } from '../actions';

export default createReducer(
  {
    [showSuccess]: () => true,
    [hideSuccess]: () => false,
  },
  false,
);