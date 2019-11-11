import initialDictionary from './initialDictionary';

export const getFirstDictionaryItem = state => state.dictionary[0] || [];
export const isSuccess = state => state.success;
export const getErrorMessage = state => state.error;
export const getPercents = state => 100 - (state.dictionary.length / initialDictionary.length * 100);