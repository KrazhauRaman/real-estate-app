import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ListItem = ({ title }) => (
  <div>
    <Link to="/flat-page">
      {title}
    </Link>
  </div>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
};
