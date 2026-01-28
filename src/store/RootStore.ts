import { makeAutoObservable } from 'mobx';
import TestStore from './TestStore';

export class RootStore {
  testStore: TestStore;

  constructor(getRandom: () => number) {
    this.testStore = new TestStore(getRandom);
    makeAutoObservable(this);
  }
}
