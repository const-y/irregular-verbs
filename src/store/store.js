import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import { checkAnswer, wait } from '../helper';
import initialDictionary from '../initialDictionary';

export default class Store {
  dictionary = initialDictionary;
  isSuccess = false;
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  get firstDictionaryItem() {
    return this.dictionary[0] || [];
  }

  get percents() {
    return 100 - (this.dictionary.length / initialDictionary.length) * 100;
  }

  shuffleDictionary() {
    this.dictionary = shuffle(this.dictionary);
  }

  dropDictionary() {
    this.dictionary = drop(this.dictionary);
  }

  showError(errorMessage) {
    this.errorMessage = errorMessage;
  }

  hideError() {
    this.errorMessage = '';
  }

  showSuccess() {
    this.isSuccess = true;
  }

  hideSuccess() {
    this.isSuccess = false;
  }

  async success() {
    this.showSuccess();
    await wait(1000);
    this.hideSuccess();
    this.dropDictionary();
  }

  async error(errorMessage) {
    this.showError(errorMessage);
    await wait(3000);
    this.hideError();
    this.shuffleDictionary();
  }

  processAnswer(answer) {
    if (checkAnswer({ answer, sampler: this.firstDictionaryItem })) {
      this.success();
    } else {
      this.error(this.firstDictionaryItem.join(', '));
    }
  }
}
