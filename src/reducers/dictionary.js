import { createReducer } from 'redux-act';
import { dropDictionary, shuffleDictionary } from '../actions';
import initialDictionary from '../initialDictionary';
import _ from 'lodash';

export const dictionary = createReducer(
  {
    [shuffleDictionary]: state => _.shuffle(state),
    [dropDictionary]: state => _.drop(state),
  },
  _.shuffle(initialDictionary),
);
