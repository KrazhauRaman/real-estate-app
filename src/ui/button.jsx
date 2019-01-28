import React from 'react';
import { PropTypes } from 'prop-types';

export const Button = ({ title, icon, onClick }) => (
  <button onClick={onClick} type="button">
    {title}
    {icon}
  </button>
);

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  title: null,
  icon: null,
  onClick: null,
};
