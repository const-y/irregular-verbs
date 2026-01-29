import { useStore } from '@/context/storeContext';
import type { Progress } from '@/storage/progress.storage';
import type { Verb } from '@/types/verb';
import cn from 'classnames';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import Checkbox from './ui/Checkbox';
import VerbProgress from './VerbProgress';

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
  const { settingsStore } = useStore();
  const isDisabled = computed(() => settingsStore.isVerbDisabled(id)).get();

  const handleCheck = () => {
    settingsStore.toggleVerb(id);
  };

  return (
    <tr className={cn({ 'opacity-50': isDisabled })}>
      <td>
        <Checkbox name={id} checked={!isDisabled} onChange={handleCheck} />
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
