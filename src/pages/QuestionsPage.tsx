import { getDictionary } from '@/api/dictionary.api';
import AlertBox from '@/components/AlertBox';
import MissingForm from '@/components/MissingForm';
import NoQuestions from '@/components/NoQuestions';
import Picture from '@/components/Picture';
import Preloader from '@/components/Preloader';
import Progress from '@/components/Progress';
import QuestionForm from '@/components/QuestionForm';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useStoreContext } from '@/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

const QuestionsPage: React.FC = () => {
  const store = useStoreContext();
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dictionary,
    queryFn: getDictionary,
  });

  if (isLoading) {
    return <Preloader />;
  }

  const isFormDisabled = store.isSuccess || !!store.errorMessage;

  const handleReviewDictionary = () => {
    store.setActiveTab('dictionary');
    store.setIsTestingMode(false);
  };

  const handleSubmit = (answer: string) => store.checkAnswer(answer);

  const handleStartTest = () => {
    store.setDictionary(data || []);
    store.shuffleDictionary();
    store.setIsTestingMode(true);
  };

  const handleStopTest = () => {
    store.setIsTestingMode(false);
  };

  if (!store.isTestingMode) {
    return (
      <div className="text-center my-5">
        <Button onClick={handleStartTest} size="lg">
          Начать тест
        </Button>
      </div>
    );
  }

  if (store.dictionary.length === 0) {
    return (
      <NoQuestions
        onReviewDictionary={handleReviewDictionary}
        onRetry={handleStartTest}
      />
    );
  }

  return (
    <>
      <div className="d-flex gap-1 align-items-center">
        <div className="w-100">
          <Progress />
        </div>
        <Button onClick={handleStopTest} variant="link">
          <X />
        </Button>
      </div>
      <div className="text-center my-4">
        <Picture />
      </div>
      <AlertBox />
      {store.taskMode === 'translateToForms' && (
        <QuestionForm
          disabled={isFormDisabled}
          onSubmit={handleSubmit}
          onNext={() => store.nextQuestion()}
        />
      )}
      {store.taskMode === 'missingForm' && (
        <MissingForm
          disabled={isFormDisabled}
          onSubmit={handleSubmit}
          onNext={() => store.nextQuestion()}
        />
      )}
    </>
  );
};

export default observer(QuestionsPage);
