import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStore } from '@/context/storeContext';
import type { Verb } from '@/types/verb';

interface ToggleAllVerbsProps {
  dictionary?: Verb[];
}

const ToggleAllVerbs: FC<ToggleAllVerbsProps> = ({ dictionary = [] }) => {
  const { settingsStore } = useStore();
  const isAllEnabled = settingsStore.isAllVerbsEnabled;

  const handleCheck = () => {
    if (isAllEnabled) {
      settingsStore.disableVerbs(dictionary);
    } else {
      settingsStore.enableAllVerbs();
    }
  };

  return <Form.Check checked={isAllEnabled} onChange={handleCheck} />;
};

export default observer(ToggleAllVerbs);
