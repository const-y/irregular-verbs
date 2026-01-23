import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import { type Tab, TABS } from '@/constants/tabs';
import { type Verb } from '@/types/verb';
import { getProgress, saveProgress } from '@/storage/progress.storage';

export default class Store {
  dictionary: Verb[] = [];
  initialLength = 1;
  isSuccess = false;
  errorMessage = '';
  isTestingMode = false;
  activeTab: Tab = TABS.TEST;

  constructor() {
    makeAutoObservable(this);

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
    const { id, base, past, pastParticiple, translation } =
      this.firstDictionaryItem;

    const progress = getProgress(id);

    this.hideSuccess();
    this.hideError();

    if (this.isAnswerCorrect(answer)) {
      this.showSuccess();
      progress.success++;
      progress.strength = Math.min(1, progress.strength + 0.15);
    } else {
      this.showError(`${base} ${past} ${pastParticiple} - ${translation}`);
      progress.fail++;
      progress.strength = Math.max(0, progress.strength - 0.25);
    }

    progress.lastSeen = Date.now();
    saveProgress(id, progress);
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
}
