import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import initialDictionary from '../initialDictionary';

export default class Store {
  dictionary = initialDictionary;
  isSuccess = false;
  errorMessage = '';
  isTestingMode = false;

  constructor() {
    makeAutoObservable(this);

    this.shuffleDictionary();
  }

  get firstDictionaryItem() {
    return this.dictionary[0] || [];
  }

  get percents() {
    return 100 - (this.dictionary.length / initialDictionary.length) * 100;
  }

  get isAnswered(): boolean {
    return this.isSuccess || !!this.errorMessage;
  }

  isAnswerCorrect(answer: string) {
    const [infinitive, past, participle] = this.firstDictionaryItem;
    const answerSampler = infinitive + ' ' + past + ' ' + participle;

    return answer.toLowerCase() === answerSampler;
  }

  setIsTestingMode(isTestingMode: boolean) {
    this.isTestingMode = isTestingMode;
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

  checkAnswer(answer: string) {
    if (this.isAnswerCorrect(answer)) {
      this.showSuccess();
    } else {
      this.showError(this.firstDictionaryItem.join(', '));
    }
  }

  nextQuestion() {
    if (this.isSuccess) {
      this.hideSuccess();
      this.dropDictionary();
    } else {
      this.hideError();
      this.shuffleDictionary();
    }
  }
}
