import React from 'react';
import PropTypes from 'prop-types';

export const BackArrow = ({ title }) => (
  <button type="button">
    {title}
  </button>
);

BackArrow.propTypes = {
  title: PropTypes.string.isRequired,
};
