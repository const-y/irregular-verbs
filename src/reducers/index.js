import { combineReducers } from 'redux';
import { dictionary } from './dictionary';
import { reducer as formReducer } from 'redux-form'
import success from './success';
import error from './error';

export default combineReducers({
  dictionary,
  form: formReducer,
  success,
  error,
});
