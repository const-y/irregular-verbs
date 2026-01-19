import isEmpty from 'lodash/isEmpty';
import { X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';
import Picture from '../components/Picture';
import Progress from '../components/Progress';
import QuestionForm from '../components/QuestionForm';
import { useStoreContext } from '../context/storeContext';

const QuestionsPage: React.FC = () => {
  const store = useStoreContext();

  useEffect(() => {
    store.loadTest();
  }, [store]);

  if (isEmpty(store.firstDictionaryItem)) {
    return <div>Нет слов для повторения</div>;
  }

  if (!store.isTestingMode) {
    return (
      <div className="text-center my-5">
        <Button onClick={() => store.setIsTestingMode(true)} size="lg">
          Начать тест
        </Button>
      </div>
    );
  }

  const handleSubmit = (answer: string) => store.checkAnswer(answer);

  const isFormDisabled = store.isSuccess || !!store.errorMessage;

  return (
    <>
      <div className="d-flex gap-1 align-items-center">
        <div className="w-100">
          <Progress />
        </div>
        <Button onClick={() => store.setIsTestingMode(false)} variant="link">
          <X />
        </Button>
      </div>
      <div className="text-center my-4">
        <Picture />
      </div>
      <AlertBox
        translate={store.firstDictionaryItem.translation}
        success={store.isSuccess}
        error={store.errorMessage}
      />
      <QuestionForm
        disabled={isFormDisabled}
        onSubmit={handleSubmit}
        onNext={() => store.nextQuestion()}
      />
    </>
  );
};

export default observer(QuestionsPage);
