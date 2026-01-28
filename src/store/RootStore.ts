import SettingsStore from './SettingsStore';
import TestStore from './TestStore';
import UIStore from './UIStore';

export class RootStore {
  testStore: TestStore;
  uiStore: UIStore;
  settingsStore: SettingsStore;

  constructor(getRandom: () => number) {
    this.uiStore = new UIStore();
    this.settingsStore = new SettingsStore();
    this.testStore = new TestStore(getRandom, this.uiStore, this.settingsStore);
  }
}
