import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStoreContext } from '../context/storeContext';
import AlertBox from './AlertBox';
import Progress from './Progress';
import QuestionForm from './QuestionForm';

function QuestionsPage() {
  const store = useStoreContext();

  if (isEmpty(store.firstDictionaryItem)) {
    return <div>Нет слов для повторения</div>;
  }

  return (
    <>
      <Progress />
      <AlertBox
        sampler={store.firstDictionaryItem}
        success={store.isSuccess}
        error={store.errorMessage}
      />
      <QuestionForm />
    </>
  );
}

export default observer(QuestionsPage);
