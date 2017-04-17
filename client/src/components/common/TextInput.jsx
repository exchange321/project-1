/**
 * Created by Wayuki on 15-Apr-17.
 */
import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      id,
      label,
      type,
      placeholder,
      value,
      onValueChange
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{ label }</label>
        <input
          type={type}
          className="form-control"
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
        />
      </div>
    );
  }
}

export default TextInput;
