import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import { Tab, TABS } from '../constants/tabs';
import { Verb } from '../types/verb';

export default class Store {
  dictionary: Verb[] = [];
  initialLength = 1;
  isSuccess = false;
  errorMessage = '';
  isTestingMode = false;
  activeTab: Tab = TABS.TEST;
  dictionaryFetcher: () => Promise<Verb[]>;

  constructor(dictionaryFetcher: () => Promise<Verb[]>) {
    makeAutoObservable(this);

    this.dictionaryFetcher = dictionaryFetcher;

    this.shuffleDictionary();
  }

  get firstDictionaryItem() {
    return this.dictionary[0] || [];
  }

  get percents() {
    return 100 - (this.dictionary.length / this.initialLength) * 100;
  }

  get isAnswered(): boolean {
    return this.isSuccess || !!this.errorMessage;
  }

  isAnswerCorrect(answer: string) {
    const { base, past, pastParticiple } = this.firstDictionaryItem;
    const answerSampler = base + ' ' + past + ' ' + pastParticiple;

    return answer.toLowerCase() === answerSampler;
  }

  setIsTestingMode(isTestingMode: boolean) {
    this.isTestingMode = isTestingMode;
    if (isTestingMode) {
      this.activeTab = TABS.TEST;
    } else {
      this.initialLength = 1;
      this.isSuccess = false;
      this.errorMessage = '';
    }
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
    this.hideSuccess();
    this.hideError();
    if (this.isAnswerCorrect(answer)) {
      this.showSuccess();
    } else {
      const { base, past, pastParticiple, translation } =
        this.firstDictionaryItem;
      this.showError(
        `Неправильно. Правильный ответ: ${base} ${past} ${pastParticiple} - ${translation}`,
      );
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

  setActiveTab(activeTab: Tab) {
    this.activeTab = activeTab;
  }

  setDictionary(dictionary: Verb[]) {
    this.dictionary = dictionary;
    this.initialLength = dictionary.length;
  }

  async loadTest() {
    try {
      const response = await this.dictionaryFetcher();
      this.setDictionary(response);
      this.shuffleDictionary();
    } catch (error) {
      console.error(error);
    }
  }
}
