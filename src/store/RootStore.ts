import SettingsStore from './SettingsStore';
import TestStore from './TestStore';
import UIStore from './UIStore';

export class RootStore {
  testStore: TestStore;
  uiStore: UIStore;
  settingsStore: SettingsStore;
  getRandom: () => number;

  constructor(getRandom: () => number) {
    this.getRandom = getRandom;
    this.uiStore = new UIStore(this);
    this.settingsStore = new SettingsStore(this);
    this.testStore = new TestStore(this);
  }
}
