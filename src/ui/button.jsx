import React from 'react';
import { PropTypes } from 'prop-types';

export const Button = ({
  title,
  icon,
  onClick,
  disabled,
  styles,
}) => (
  <button disabled={disabled} onClick={onClick} className={styles} type="button">
    {title}
    {icon}
  </button>
);

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.shape({
    $$typeof: PropTypes.symbol,
  }),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  styles: PropTypes.string,
};

Button.defaultProps = {
  title: null,
  icon: null,
  onClick: null,
  disabled: false,
  styles: '',
};
