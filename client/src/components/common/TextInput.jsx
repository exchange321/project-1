/**
 * Created by Wayuki on 15-Apr-17.
 */
import React, { Component, PropTypes } from 'react';

const TextInput = ({ id, label, type, placeholder, value, onValueChange, error }) => {
  const hasError = error.length > 0;
  return (
    <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
      <label htmlFor={id}>{ label }</label>
      <input
        type={type}
        className={`form-control ${hasError ? 'form-control-danger' : ''}`}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
      />
      {
        hasError ? (
          <div className="form-control-feedback">{error}</div>
        ) : null
      }
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default TextInput;
