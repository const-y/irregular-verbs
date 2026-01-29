import { type Tab, TABS } from '@/constants/tabs';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export default class UIStore {
  rootStore: RootStore;
  activeTab: Tab = TABS.TEST;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setActiveTab(activeTab: Tab) {
    this.activeTab = activeTab;
  }
}
