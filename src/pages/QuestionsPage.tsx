import { getDictionary } from '@/api/dictionary.api';
import AlertBox from '@/components/AlertBox';
import MissingForm from '@/components/MissingForm';
import NoQuestions from '@/components/NoQuestions';
import Picture from '@/components/Picture';
import Preloader from '@/components/Preloader';
import Progress from '@/components/Progress';
import QuestionForm from '@/components/QuestionForm';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useStore } from '@/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import { Info, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

const QuestionsPage: FC = () => {
  const { testStore, uiStore, settingsStore } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dictionary,
    queryFn: getDictionary,
  });

  if (isLoading) {
    return <Preloader />;
  }

  const isFormDisabled = testStore.isSuccess || !!testStore.errorMessage;

  const handleReviewDictionary = () => {
    uiStore.setActiveTab('dictionary');
    testStore.setIsTestingMode(false);
  };

  const handleSubmit = (answer: string) => testStore.checkAnswer(answer);

  const handleStartTest = () => {
    testStore.setDictionary(data || []);
    testStore.shuffleDictionary();
    testStore.setIsTestingMode(true);
  };

  const handleStopTest = () => {
    testStore.setIsTestingMode(false);
  };

  const popover = (
    <Popover>
      <Popover.Header as="h3">Ваш тест — ваши правила</Popover.Header>
      <Popover.Body>
        Хотите меньше слов? Или только сложные? Заходите в "Словарь" и
        настройте, какие глаголы будут в повторении.
        <Button variant="link" onClick={handleReviewDictionary}>
          Перейти в словарь
        </Button>
      </Popover.Body>
    </Popover>
  );

  if (!testStore.isTestingMode) {
    const loadedCount = data?.length ?? 0;
    const selectedVerbsCount = Math.max(
      loadedCount - settingsStore.disabledVerbs.size,
      0,
    );

    return (
      <div className="text-center my-5">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
        <h2>Готов к повторению?</h2>
        <p className="text-muted">
          Выбрано слов {selectedVerbsCount}
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popover}
            rootClose
          >
            <Button
              variant="link"
              className="p-0 ms-1 d-inline-flex align-items-center"
              aria-label="Подробнее"
              style={{ lineHeight: 1 }}
            >
              <Info size={20} />
            </Button>
          </OverlayTrigger>
        </p>
        <Button
          size="lg"
          variant="primary"
          className="px-4 py-3 fs-5"
          onClick={handleStartTest}
        >
          Начать тест
        </Button>
      </div>
    );
  }

  if (testStore.dictionary.length === 0) {
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
      {testStore.taskMode === 'translateToForms' && (
        <QuestionForm
          disabled={isFormDisabled}
          onSubmit={handleSubmit}
          onNext={() => testStore.nextQuestion()}
        />
      )}
      {testStore.taskMode === 'missingForm' && (
        <MissingForm
          disabled={isFormDisabled}
          onSubmit={handleSubmit}
          onNext={() => testStore.nextQuestion()}
        />
      )}
    </>
  );
};

export default observer(QuestionsPage);
