import React from 'react';
import PropTypes from 'prop-types';

export const Search = ({
  placeholder, onChange, value, onKeyPress, disabled,
}) => (
  <input
    placeholder={placeholder}
    type="text"
    onChange={e => onChange(e)}
    onKeyPress={e => onKeyPress(e)}
    value={value}
    disabled={disabled}
  />);

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  disabled: PropTypes.bool,
};

Search.defaultProps = {
  value: '',
  onChange: null,
  onKeyPress: null,
  disabled: false,
};
