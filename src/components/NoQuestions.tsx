import type { FC } from 'react';
import { Button } from 'react-bootstrap';

interface NoQuestionsProps {
  onReviewDictionary: () => void;
  onRetry: () => void;
}

const NoQuestions: FC<NoQuestionsProps> = ({ onReviewDictionary, onRetry }) => {
  return (
    <div className="text-center p-5">
      <h2>Что дальше?</h2>
      <p>Нет слов для повторения. Вот что можно сделать:</p>

      <div className="d-flex flex-column gap-3 mt-4 align-items-center">
        <Button size="lg" onClick={onReviewDictionary}>
          🔍 Просмотреть словарь
        </Button>
        <Button size="lg" onClick={onRetry}>
          🔄 Пройти ещё раз
        </Button>
      </div>
    </div>
  );
};

export default NoQuestions;
