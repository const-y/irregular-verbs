import { createReducer } from 'redux-act';
import { hideError, showError } from '../actions';

export default createReducer(
  {
    [showError]: (state, payload) => payload,
    [hideError]: () => '',
  },
  '',
);