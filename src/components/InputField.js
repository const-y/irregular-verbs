import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import { Form } from 'react-bootstrap';

const InputField = ({ input, placeholder }) => {
  const { value, onChange } = input;

  return (
    <Form.Control
      text={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

InputField.defaultProps = {
  placeholder: '',
};

InputField.propTypes = {
  ...fieldPropTypes,
  placeholder: PropTypes.string,
};

export default InputField;
