import { createAction } from 'redux-act';

export const shuffleDictionary = createAction('shuffle dictionary');

/**
 * Remove first (current) item of the dictionary
 * @type {EmptyActionCreator}
 */
export const dropDictionary = createAction('drop dictionary');
