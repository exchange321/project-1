/**
 * Created by Wayuki on 15-Apr-17.
 */
import React, { PropTypes } from 'react';

const TextareaInput = ({ id, label, placeholder, value, onValueChange, error }) => {
  const hasError = error.length > 0;
  return (
    <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
      <label htmlFor={id}>{ label }</label>
      <textarea
        className={`form-control ${hasError ? 'form-control-danger' : ''}`}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
        rows="5"
      />
      {
        hasError ? (
          <div className="form-control-feedback">{error}</div>
        ) : null
      }
    </div>
  );
};

TextareaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default TextareaInput;
