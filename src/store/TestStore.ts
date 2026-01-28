import { TABS } from '@/constants/tabs';
import { getProgress, saveProgress } from '@/storage/progress.storage';
import type { TaskMode } from '@/types/test';
import { type Verb } from '@/types/verb';
import { getRandomItem } from '@/utils/array';
import { getRandomTaskMode } from '@/utils/taskMode.utils';
import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import { makeAutoObservable } from 'mobx';
import type UIStore from './UIStore';
import type SettingsStore from './SettingsStore';

export default class TestStore {
  dictionary: Verb[] = [];
  initialLength = 1;
  isSuccess = false;
  errorMessage = '';
  isTestingMode = false;
  taskMode: TaskMode = 'translateToForms';
  getRandom: () => number;
  uiStore: UIStore;
  settingsStore: SettingsStore;

  constructor(
    getRandom: () => number,
    uiStore: UIStore,
    settingsStore: SettingsStore,
  ) {
    this.getRandom = getRandom;
    this.uiStore = uiStore;
    this.settingsStore = settingsStore;

    makeAutoObservable(this);
  }

  get activeVerb(): Verb | null {
    return this.dictionary[0] ?? null;
  }

  /**
   * @deprecated use `activeVerb`
   */
  get firstDictionaryItem() {
    return this.dictionary[0] ?? {};
  }

  get percents() {
    return 100 - (this.dictionary.length / this.initialLength) * 100;
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
    const { base, past, pastParticiple } = this.firstDictionaryItem;
    const answerSampler = base + ' ' + past + ' ' + pastParticiple;

    return answer.toLowerCase() === answerSampler;
  }

  setIsTestingMode(isTestingMode: boolean) {
    this.isTestingMode = isTestingMode;
    if (isTestingMode) {
      this.uiStore.setActiveTab(TABS.TEST);
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

    this.taskMode = getRandomItem(
      ['translateToForms', 'missingForm'],
      this.getRandom,
    );
  }

  setDictionary(dictionary: Verb[]) {
    const enabledVerbs = dictionary.filter(
      (verb) => !this.settingsStore.isVerbDisabled(verb.id),
    );
    this.dictionary = enabledVerbs;
    this.initialLength = enabledVerbs.length;
  }

  resetAndRestart(dictionary: Verb[]) {
    this.dictionary = dictionary;
    this.shuffleDictionary();

    this.taskMode = getRandomTaskMode(this.getRandom);
    this.isTestingMode = true;
    this.uiStore.setActiveTab('test');
  }
}
