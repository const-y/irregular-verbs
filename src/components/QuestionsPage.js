import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StoreContext } from '../context/storeContext';
import QuestionForm from './QuestionForm';
import Progress from './Progress';
import AlertBox from './AlertBox';

function QuestionsPage() {
  const store = useContext(StoreContext);

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
