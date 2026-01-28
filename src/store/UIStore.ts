import { type Tab, TABS } from '@/constants/tabs';
import { makeAutoObservable } from 'mobx';

export default class UIStore {
  activeTab: Tab = TABS.TEST;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(activeTab: Tab) {
    this.activeTab = activeTab;
  }
}
