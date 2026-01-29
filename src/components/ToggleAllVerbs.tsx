import { useStore } from '@/context/storeContext';
import type { Verb } from '@/types/verb';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import Checkbox from './ui/Checkbox';

interface ToggleAllVerbsProps {
  dictionary?: Verb[];
}

const ToggleAllVerbs: FC<ToggleAllVerbsProps> = ({ dictionary = [] }) => {
  const { settingsStore } = useStore();
  const isAllEnabled = settingsStore.isAllVerbsEnabled;
  const isSomeEnabled =
    !isAllEnabled && settingsStore.disabledVerbs.size < dictionary.length;

  const handleCheck = () => {
    if (isAllEnabled) {
      settingsStore.disableVerbs(dictionary);
    } else {
      settingsStore.enableAllVerbs();
    }
  };

  return (
    <Checkbox
      checked={isAllEnabled}
      indeterminate={isSomeEnabled}
      onChange={handleCheck}
    />
  );
};

export default observer(ToggleAllVerbs);
