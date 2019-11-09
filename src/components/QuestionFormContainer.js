import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getErrorMessage, getFirstDictionaryItem, isSuccess } from '../selectors';
import { compose } from 'redux';
import { success, error } from '../actions';
import { propTypes, reduxForm, Field} from 'redux-form';
import InputField from './InputField';
import { answer, sampler } from '../constants/fields';
import { checkAnswer } from '../helper';
import _ from 'lodash';
import AlertBox from './AlertBox';
import { form } from '../constants/form';

function QuestionFormContainer({ topWord, handleSubmit, success, errorMessage }) {
  const disabled = success || !!errorMessage;

  if (_.isEmpty(topWord)) {
    return <div>Нет слов для повторения</div>
  }

  return (
    <Form onSubmit={handleSubmit} disabled>
      <AlertBox
        sampler={topWord}
        success={success}
        error={errorMessage}
      />
      <p>
        <Field
          name={answer}
          component={InputField}
          placeholder="Введите перевод в трех формах через пробел"
          disabled={disabled}
        />
      </p>
      <Button
        onClick={handleSubmit}
        disabled={disabled}
      >
        Далее
      </Button>
    </Form>
  );
}

const mapStateToProps = state => ({
  topWord: getFirstDictionaryItem(state),
  initialValues: {
    [sampler]: getFirstDictionaryItem(state),
    [answer]: '',
  },
  success: isSuccess(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => {
    if (checkAnswer(data)) {
      dispatch(success());
    } else {
      dispatch(error(_.toString(data.sampler)));
    }
  }
});

QuestionFormContainer.propTypes = {
  ...propTypes,
  topWord: PropTypes.array.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form,
    enableReinitialize: true,
  }),
)(QuestionFormContainer);
