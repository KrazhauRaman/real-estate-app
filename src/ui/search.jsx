import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  placeholder, onChange, value, onKeyPress, disabled, styles,
}) => (
  <input
    placeholder={placeholder}
    type="text"
    onChange={e => onChange(e)}
    onKeyPress={e => onKeyPress(e)}
    value={value}
    disabled={disabled}
    className={styles}
  />);

export default Search;

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  disabled: PropTypes.bool,
  styles: PropTypes.string,
};

Search.defaultProps = {
  value: '',
  onChange: null,
  onKeyPress: null,
  disabled: false,
  styles: '',
};
