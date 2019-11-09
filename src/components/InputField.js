import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import { Form } from 'react-bootstrap';

const InputField = ({ input, placeholder, disabled }) => {
  const { value, onChange } = input;

  return (
    <Form.Control
      text={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

InputField.defaultProps = {
  placeholder: '',
  disabled: false,
};

InputField.propTypes = {
  ...fieldPropTypes,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
