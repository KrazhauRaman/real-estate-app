/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './button';

export const Pagination = ({
  currentPage, maxPages, newPageIndexCallback,
}) => {
  const paginatorButtons = [];

  paginatorButtons.push(
    <Button
      key={100}
      icon="---<<"
      disabled={currentPage === 1}
      onClick={() => { newPageIndexCallback(1); }}
    />,
  );
  paginatorButtons.push(
    <Button
      key={101}
      icon="---<"
      disabled={currentPage === 1}
      onClick={() => { newPageIndexCallback(currentPage - 1); }}
    />,
  );

  function createNumericalButton(key) {
    return (
      <Button
        key={String(key)}
        title={String(key)}
        onClick={() => { newPageIndexCallback(key); }}
      />
    );
  }

  if (maxPages < 5) {
    for (let i = 1; i < 5; i++) {
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
      icon="--->"
      disabled={currentPage === maxPages}
      onClick={() => { newPageIndexCallback(currentPage + 1); }}
    />,
  );
  paginatorButtons.push(
    <Button
      key={103}
      icon="--->>"
      disabled={currentPage === maxPages}
      onClick={() => { newPageIndexCallback(maxPages); }}
    />,
  );


  return paginatorButtons;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  newPageIndexCallback: PropTypes.func.isRequired,
};
