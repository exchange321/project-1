/**
 * Created by Wayuki on 15-Apr-17.
 */
import React, { PropTypes } from 'react';

const TextareaInput = ({ id, label, placeholder, value, onValueChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{ label }</label>
    <textarea
      className="form-control"
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onValueChange}
      rows="5"
    />
  </div>
);

TextareaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default TextareaInput;
