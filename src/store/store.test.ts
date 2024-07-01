import initialDictionary from '../initialDictionary';
import Store from './store';

describe('store', () => {
  it('inits store with the question list', () => {
    const store = new Store();

    expect(store.dictionary).toEqual(initialDictionary);
  });

  it('gets a firs item of the dictionary', () => {
    const store = new Store();
    const firstItem = store.firstDictionaryItem;

    expect(firstItem).toEqual(initialDictionary[0]);
  });

  it('removes the firs element of the dictionary', () => {
    const store = new Store();
    store.dropDictionary();

    expect(store.dictionary.length).toBe(initialDictionary.length - 1);
    expect(store.dictionary[0]).not.toEqual(initialDictionary[0]);
  });

  it('returns answer is correct', () => {
    const store = new Store();
    const answer = 'meet met met';

    expect(store.isAnswerCorrect(answer)).toBe(true);
  });

  it('returns answer is not correct', () => {
    const store = new Store();
    const answer = 'some string';

    expect(store.isAnswerCorrect(answer)).toBe(false);
  });
});
