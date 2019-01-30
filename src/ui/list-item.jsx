import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ListItem = ({
  title,
  summary,
  thumbUrl,
  id,
}) => (
  <div>
    <Link to={`/flat-page/${id}`}>
      <img src={thumbUrl} alt={title} />
      {title}
      {summary}
    </Link>
  </div>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  thumbUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
};


ListItem.defaultProps = {
  thumbUrl: 'https://resources.nestimg.com/nestoria/img/cs4.2_v1.png',
  summary: 'We have no summary for this apartment',
};
