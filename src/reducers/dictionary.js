import { createReducer } from 'redux-act';
import { shuffleDictionary } from '../actions';
import { shuffleArray } from '../utils';
import dict from '../dictionary';

export const dictionary = createReducer(
  {
    [shuffleDictionary]: state => shuffleArray(state),
  },
  shuffleArray(dict),
);
