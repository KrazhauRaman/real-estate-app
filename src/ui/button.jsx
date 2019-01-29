import React from 'react';
import { PropTypes } from 'prop-types';

export const Button = ({
  title, icon, onClick, disabled,
}) => (
  <button disabled={disabled} onClick={onClick} type="button">
    {title}
    {icon}
  </button>
);

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  title: null,
  icon: null,
  onClick: null,
  disabled: false,
};
