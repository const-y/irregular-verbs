import { useStore } from '@/context/storeContext';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { Button } from 'react-bootstrap';

interface ActionsProps {
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
  onNextClick: () => void;
  isSubmitDisabled: boolean;
  onSkipClick: () => void;
}

const Actions: FC<ActionsProps> = ({
  onNextClick,
  nextButtonRef,
  isSubmitDisabled,
  onSkipClick,
}) => {
  const { testStore } = useStore();

  return (
    <div className="text-center m-3">
      {testStore.isAnswered ? (
        <Button size="lg" onClick={onNextClick} ref={nextButtonRef}>
          Далее
        </Button>
      ) : (
        <div className="d-flex justify-content-center gap-2">
          <Button type="submit" disabled={isSubmitDisabled} size="lg">
            Проверить
          </Button>
          <Button size="lg" variant="secondary" onClick={onSkipClick}>
            Пропустить
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(Actions);
