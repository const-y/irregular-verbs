import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFirstDictionaryItem } from '../selectors';
import { compose } from 'redux';
import { shuffleDictionary, success, error } from '../actions';
import { propTypes, reduxForm, Field} from 'redux-form';
import InputField from './InputField';
import { answer, sampler } from '../constants/fields';
import { checkAnswer } from '../helper';
import _ from 'lodash';

const form = 'test';

const QuestionFormContainer = ({ topWord, shuffleDictionary, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Alert variant="primary">
        {topWord[3]}
      </Alert>
      <p>
        <Field
          name={answer}
          component={InputField}
          placeholder="Введите перевод в трех формах через пробел"
        />
      </p>
      <Button onClick={handleSubmit}>
        Далее
      </Button>
      <Button variant="secondary" onClick={shuffleDictionary}>
        Shuffle
      </Button>
    </Form>
  );
};

const mapStateToProps = state => ({
  topWord: getFirstDictionaryItem(state),
  initialValues: {
    [sampler]: getFirstDictionaryItem(state),
    [answer]: '',
  },
});

const mapDispatchToProps = dispatch => ({
  shuffleDictionary: () => {
    dispatch(shuffleDictionary())
  },
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
  shuffleDictionary: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form,
  }),
)(QuestionFormContainer);
