import TestStore from './TestStore';
import UIStore from './UIStore';

export class RootStore {
  testStore: TestStore;
  uiStore: UIStore;

  constructor(getRandom: () => number) {
    this.uiStore = new UIStore();
    this.testStore = new TestStore(getRandom, this.uiStore);
  }
}
