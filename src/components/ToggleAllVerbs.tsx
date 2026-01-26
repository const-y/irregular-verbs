import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStoreContext } from '@/context/storeContext';
import type { Verb } from '@/types/verb';

interface ToggleAllVerbsProps {
  dictionary?: Verb[];
}

const ToggleAllVerbs: FC<ToggleAllVerbsProps> = ({ dictionary = [] }) => {
  const store = useStoreContext();
  const isAllEnabled = store.isAllVerbsEnabled;

  const handleCheck = () => {
    if (isAllEnabled) {
      store.disableVerbs(dictionary);
    } else {
      store.enableAllVerbs();
    }
  };

  return <Form.Check checked={isAllEnabled} onChange={handleCheck} />;
};

export default observer(ToggleAllVerbs);
