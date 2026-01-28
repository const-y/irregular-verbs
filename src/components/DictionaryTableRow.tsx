import type { Verb } from '@/types/verb';
import cn from 'classnames';
import { Form } from 'react-bootstrap';
import VerbProgress from './VerbProgress';
import type { FC } from 'react';
import type { Progress } from '@/storage/progress.storage';
import { useStore } from '@/context/storeContext';
import { observer } from 'mobx-react-lite';
import { computed } from 'mobx';

interface DictionaryTableRowProps {
  index: number;
  verb: Verb;
  progress: Progress;
}

const DictionaryTableRow: FC<DictionaryTableRowProps> = ({
  index,
  verb,
  progress,
}) => {
  const { id, base, past, pastParticiple, translation } = verb;
  const { testStore: store } = useStore();
  const isDisabled = computed(() => store.isVerbDisabled(id)).get();

  const handleCheck = () => {
    store.toggleVerb(id);
  };

  return (
    <tr className={cn({ 'opacity-50': isDisabled })}>
      <td>
        <Form.Check name={id} checked={!isDisabled} onChange={handleCheck} />
      </td>
      <td>{index + 1}</td>
      <td>{base}</td>
      <td>{past}</td>
      <td>{pastParticiple}</td>
      <td>{translation}</td>
      <td>
        <VerbProgress progress={progress} />
      </td>
    </tr>
  );
};

export default observer(DictionaryTableRow);
