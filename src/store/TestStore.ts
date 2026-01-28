import { TABS } from '@/constants/tabs';
import { getProgress, saveProgress } from '@/storage/progress.storage';
import type { TaskMode } from '@/types/test';
import { type Verb } from '@/types/verb';
import { getRandomItem } from '@/utils/array';
import { getRandomTaskMode } from '@/utils/taskMode.utils';
import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export default class TestStore {
  rootStore: RootStore;
  dictionary: Verb[] = [];
  initialLength = 1;
  isSuccess = false;
  errorMessage = '';
  isTestingMode = false;
  taskMode: TaskMode = 'translateToForms';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get activeVerb(): Verb | null {
    return this.dictionary[0] ?? null;
  }

  get completionPercent() {
    if (this.initialLength === 0) return 0;
    return (
      ((this.initialLength - this.dictionary.length) / this.initialLength) * 100
    );
  }

  get isAnswered(): boolean {
    return this.isSuccess || !!this.errorMessage;
  }

  get taskDescription() {
    return this.taskMode === 'missingForm'
      ? 'Заполните пропуск'
      : this.activeVerb?.translation;
  }

  isAnswerCorrect(answer: string) {
    if (!this.activeVerb) return false;
    const { base, past, pastParticiple } = this.activeVerb;
    const answerSampler = base + ' ' + past + ' ' + pastParticiple;

    return answer.toLowerCase() === answerSampler;
  }

  setIsTestingMode(isTestingMode: boolean) {
    this.isTestingMode = isTestingMode;
    if (isTestingMode) {
      this.rootStore.uiStore.setActiveTab(TABS.TEST);
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
    if (!this.activeVerb) return;

    const { id, base, past, pastParticiple, translation } = this.activeVerb;
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

    this.taskMode = getRandomItem(['translateToForms', 'missingForm'], () =>
      this.rootStore.getRandom(),
    );
  }

  setDictionary(dictionary: Verb[]) {
    const enabledVerbs = dictionary.filter(
      (verb) => !this.rootStore.settingsStore.isVerbDisabled(verb.id),
    );
    this.dictionary = enabledVerbs;
    this.initialLength = enabledVerbs.length;
  }

  resetAndRestart(dictionary: Verb[]) {
    this.dictionary = dictionary;
    this.shuffleDictionary();

    this.taskMode = getRandomTaskMode(this.rootStore.getRandom);
    this.isTestingMode = true;
    this.rootStore.uiStore.setActiveTab('test');
  }
}
