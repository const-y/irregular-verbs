import { useStore } from '@/context/storeContext';
import type { Progress } from '@/storage/progress.storage';
import type { Verb } from '@/types/verb';
import { VerbRowViewModel } from '@/viewmodels/VerbRowViewModel';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useMemo, type FC } from 'react';
import Checkbox from './ui/Checkbox';
import VerbProgress from './VerbProgress';

interface DictionaryTableRowProps {
  verb: Verb;
  progress: Progress;
}

const DictionaryTableRow: FC<DictionaryTableRowProps> = ({
  verb,
  progress,
}) => {
  const { id, base, past, pastParticiple, translation } = verb;
  const { settingsStore } = useStore();

  const viewModel = useMemo(
    () => new VerbRowViewModel(id, settingsStore),
    [id, settingsStore],
  );

  return (
    <tr className={cn({ 'opacity-50': viewModel.isDisabled })}>
      <td>
        <Checkbox
          name={id}
          checked={viewModel.isChecked}
          onChange={viewModel.toggle}
        />
      </td>
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
