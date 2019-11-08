import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFirstDictionaryItem } from '../selectors';
import { compose } from 'redux';
import { shuffleDictionary } from '../actions';

const QuestionFormContainer = ({ onSubmit, topWord, shuffleDictionary }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Alert variant="primary">
        {topWord[3]}
      </Alert>
      <p>
        <Form.Control placeholder="Введите перевод в трех формах через пробел" />
      </p>
      <Button onClick={onSubmit}>
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
});

const mapDispatchToProps = dispatch => ({
  shuffleDictionary: () => {
    dispatch(shuffleDictionary())
  },
  onSubmit: () => {
    alert();
  }
});

QuestionFormContainer.propTypes = {
  topWord: PropTypes.array.isRequired,
  shuffleDictionary: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(QuestionFormContainer);
