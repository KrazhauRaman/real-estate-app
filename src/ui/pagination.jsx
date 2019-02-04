/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import styles from '../css/pagination.css';

const Pagination = ({
  currentPage,
  maxPages,
  newPageIndexCallback,
}) => {
  const paginatorButtons = [];

  function createNumericalButton(key) {
    return (
      <Button
        key={String(key)}
        title={String(key)}
        onClick={(key === currentPage) ? null : () => { newPageIndexCallback(key); }}
        styles={
          (key === currentPage)
            ? styles.pagination__button_active
            : styles.pagination__button
        }
      />
    );
  }

  paginatorButtons.push(
    <Button
      key={100}
      icon={<i className="large material-icons">first_page</i>}
      disabled={currentPage === 1}
      onClick={() => { newPageIndexCallback(1); }}
      styles={styles.pagination__button}
    />,
  );
  paginatorButtons.push(
    <Button
      key={101}
      icon={<i className="large material-icons">navigate_before</i>}
      disabled={currentPage === 1}
      onClick={() => { newPageIndexCallback(currentPage - 1); }}
      styles={styles.pagination__button}
    />,
  );

  if (maxPages < 5) {
    for (let i = 1; i < maxPages + 1; i++) {
      paginatorButtons.push(createNumericalButton(i));
    }
  } else {
    switch (currentPage) {
      case 1:
      case 2: {
        for (let i = 1; i < 6; i++) {
          paginatorButtons.push(createNumericalButton(i));
        }
        break;
      }
      case maxPages:
      case maxPages - 1: {
        for (let i = maxPages - 4; i <= maxPages; i++) {
          paginatorButtons.push(createNumericalButton(i));
        }
        break;
      }
      default: {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          paginatorButtons.push(createNumericalButton(i));
        }
        break;
      }
    }
  }

  paginatorButtons.push(
    <Button
      key={102}
      icon={<i className="large material-icons">navigate_next</i>}
      disabled={currentPage === maxPages}
      onClick={() => { newPageIndexCallback(currentPage + 1); }}
      styles={styles.pagination__button}
    />,
  );

  paginatorButtons.push(
    <Button
      key={103}
      icon={<i className="large material-icons">last_page</i>}
      disabled={currentPage === maxPages}
      onClick={() => { newPageIndexCallback(maxPages); }}
      styles={styles.pagination__button}
    />,
  );


  return paginatorButtons;
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  newPageIndexCallback: PropTypes.func.isRequired,
};
