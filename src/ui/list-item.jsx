import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../css/list-item.css';

const ListItem = ({
  title,
  summary,
  thumbUrl,
  id,
  price,
}) => (
  <div className={styles.ListItem}>
    <Link to={`/flat-page/${id}`}>
      <div className={styles.ListItem__infoDiv}>
        <div className={styles.ListItem__infoDiv_header}>
          <span className={styles.ListItem__infoDiv_header_title}>{title}</span>
          <span className={styles.ListItem__infoDiv_header_price}>{price}</span>
        </div>
        <span className={styles.ListItem__infoDiv_summary}>{summary}</span>
      </div>
      <div className={styles.ListItem__backgroundDiv} style={{ backgroundImage: `url(${thumbUrl})` }} />
    </Link>
  </div>
);

export default ListItem;

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  thumbUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
  price: PropTypes.string,
};


ListItem.defaultProps = {
  thumbUrl: 'https://resources.nestimg.com/nestoria/img/cs4.2_v1.png',
  summary: 'We have no summary for this apartment',
  price: 'unknown',
};
