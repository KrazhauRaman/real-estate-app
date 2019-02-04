import React from 'react';
import styles from '../css/back-arrow.css';

export const BackArrow = () => (
  <button type="button" className={styles.backArrow__button}>
    <i className="large material-icons">backspace</i>
  </button>
);
