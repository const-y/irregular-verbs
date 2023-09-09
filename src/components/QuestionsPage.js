import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StoreContext } from '../context/storeContext';
import QuestionForm from './QuestionForm';

function QuestionsPage() {
  const store = useContext(StoreContext);

  if (isEmpty(store.firstDictionaryItem)) {
    return <div>Нет слов для повторения</div>;
  }

  return <QuestionForm />;
}

export default observer(QuestionsPage);
