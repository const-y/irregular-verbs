export const getFirstDictionaryItem = state => state.dictionary[0] || [];
export const isSuccess = state => state.success;
export const getErrorMessage = state => state.error;