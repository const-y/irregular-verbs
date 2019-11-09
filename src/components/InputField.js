import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import { Form } from 'react-bootstrap';

function InputField({ input, placeholder, disabled }){
  const inputEl = useRef(null);
  const { value, onChange } = input;

  useEffect(() => {
    inputEl.current.focus();
  }, [disabled]);

  return (
    <Form.Control
      ref={inputEl}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

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
