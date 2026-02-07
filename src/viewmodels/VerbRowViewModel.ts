import type SettingsStore from '@/store/SettingsStore';
import { makeAutoObservable } from 'mobx';

export class VerbRowViewModel {
  private readonly verbId: string;
  private readonly settingsStore: SettingsStore;

  constructor(verbId: string, settingsStore: SettingsStore) {
    this.verbId = verbId;
    this.settingsStore = settingsStore;

    makeAutoObservable(this);
  }

  get isDisabled(): boolean {
    return this.settingsStore.isVerbDisabled(this.verbId);
  }

  get isChecked(): boolean {
    return !this.isDisabled;
  }

  toggle = (): void => {
    this.settingsStore.toggleVerb(this.verbId);
  };
}
