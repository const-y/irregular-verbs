import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import { wait } from '../helper';
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

  isAnswerCorrect(answer: string) {
    const [infinitive, past, participle] = this.firstDictionaryItem;
    const answerSampler = infinitive + ' ' + past + ' ' + participle;

    return answer.toLowerCase() === answerSampler;
  }

  shuffleDictionary() {
    this.dictionary = shuffle(this.dictionary);
  }

  dropDictionary() {
    this.dictionary = drop(this.dictionary);
  }

  showError(errorMessage: string) {
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

  async processAnswer(answer: string) {
    if (this.isAnswerCorrect(answer)) {
      this.showSuccess();
      await wait(1000);
      this.hideSuccess();
      this.dropDictionary();
    } else {
      this.showError(this.firstDictionaryItem.join(', '));
      await wait(3000);
      this.hideError();
      this.shuffleDictionary();
    }
  }
}
