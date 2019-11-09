import { createAction } from 'redux-act';
import { wait } from './helper';

export const shuffleDictionary = createAction('shuffle dictionary');

/**
 * Remove first (current) item of the dictionary
 * @type {EmptyActionCreator}
 */
export const dropDictionary = createAction('drop dictionary');

export const showError = createAction('show error');
export const hideError = createAction('hide error message');
export const showSuccess = createAction('show success');
export const hideSuccess = createAction('hide success message');

export const success = () => async dispatch => {
  dispatch(showSuccess());
  await wait(3000);
  dispatch(hideSuccess());
  dispatch(dropDictionary());
};

export const error = errorMessage => async dispatch => {
  dispatch(showError(errorMessage));
  await wait(3000);
  dispatch(hideError());
  dispatch(shuffleDictionary());
};
