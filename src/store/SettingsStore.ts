import {
  loadDisabledVerbs,
  saveDisabledVerbs,
} from '@/storage/disabled-verbs.storage';
import { type Verb } from '@/types/verb';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export default class SettingsStore {
  disabledVerbs: Set<string> = new Set();
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.loadDisabledVerbs();
  }

  get isAllVerbsEnabled() {
    return this.disabledVerbs.size === 0;
  }

  loadDisabledVerbs() {
    this.disabledVerbs = loadDisabledVerbs();
  }

  toggleVerb(id: string) {
    if (this.disabledVerbs.has(id)) {
      this.disabledVerbs.delete(id);
    } else {
      this.disabledVerbs.add(id);
    }
    saveDisabledVerbs(this.disabledVerbs);
  }

  enableAllVerbs() {
    this.disabledVerbs.clear();
    saveDisabledVerbs(this.disabledVerbs);
  }

  disableVerbs(dictionary: Verb[]) {
    this.disabledVerbs = new Set(dictionary.map(({ id }) => id));
    saveDisabledVerbs(this.disabledVerbs);
  }

  isVerbDisabled(id: string) {
    return this.disabledVerbs.has(id);
  }
}
