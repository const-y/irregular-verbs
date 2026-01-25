import { observer } from 'mobx-react-lite';
import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form, Table } from 'react-bootstrap';
import { useStoreContext } from '@/context/storeContext';
import type { VerbForm } from '@/types/verb';
import { getRandomItem } from '@/utils/array';
import Actions from './Actions';

interface MissingFormProps {
  disabled: boolean;
  onSubmit: (answer: string) => void;
  onNext: () => void;
}

const VERB_FORMS: VerbForm[] = ['base', 'past', 'pastParticiple'];

const MissingForm: React.FC<MissingFormProps> = ({
  disabled,
  onSubmit,
  onNext,
}: MissingFormProps) => {
  const [answer, setAnswer] = useState('');
  const store = useStoreContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [missingForm, setMissingForm] = useState(
    getRandomItem(VERB_FORMS, Math.random),
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const base =
      missingForm === 'base' ? answer : store.firstDictionaryItem.base;
    const past =
      missingForm === 'past' ? answer : store.firstDictionaryItem.past;
    const pastParticiple =
      missingForm === 'pastParticiple'
        ? answer
        : store.firstDictionaryItem.pastParticiple;

    onSubmit(`${base} ${past} ${pastParticiple}`);
  };

  const handleNext = () => {
    onNext();
    setAnswer('');
  };

  useEffect(() => {
    setMissingForm(getRandomItem(VERB_FORMS, Math.random));
  }, [store.firstDictionaryItem]);

  useEffect(() => {
    if (store.isAnswered) {
      nextButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [store.isAnswered]);

  const handleAnswerChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAnswer(e.target.value);
  };

  const handleSkip = () => {
    onSubmit('');
    setAnswer('');
  };

  const renderCell = (form: VerbForm) => {
    if (form === missingForm) {
      return (
        <Form.Control
          ref={inputRef}
          name={missingForm}
          value={answer}
          autoFocus
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={handleAnswerChange}
        />
      );
    }

    return <strong>{store.firstDictionaryItem[form]}</strong>;
  };

  const columnWidth = 100 / 3;

  return (
    <Form onSubmit={handleSubmit} data-testid="question-form">
      <Table bordered className="text-center align-middle">
        <thead>
          <tr>
            <th style={{ width: `${columnWidth}%` }}>Infinitive</th>
            <th style={{ width: `${columnWidth}%` }}>Past Simple</th>
            <th style={{ width: `${columnWidth}%` }}>Past Participle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{renderCell('base')}</td>
            <td>{renderCell('past')}</td>
            <td>{renderCell('pastParticiple')}</td>
          </tr>
        </tbody>
      </Table>
      <Actions
        nextButtonRef={nextButtonRef}
        onNextClick={handleNext}
        isSubmitDisabled={disabled || !answer}
        onSkipClick={handleSkip}
      />
    </Form>
  );
};

export default observer(MissingForm);
