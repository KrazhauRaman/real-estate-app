/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import {
  SET_FLATS,
  SET_PAGES,
  TOGGLE_LOADING,
  SET_CURRENT_PAGE,
  SET_FLATS_QUANTITY,
  SET_LOCATION,
  SET_BACK_ADDRESS,
  SET_IS_NO_RESULT,
} from './_action-types';

const initialState = {
  flats: [],
  maxPages: 0,
  isLoading: false,
  currentPage: 1,
  location: '',
  flatsQuantity: 20,
  backAddress: '/',
  isNoResult: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLATS: {
      // for pagination should be = []
      const flatsArray = [...state.flats];
      if (action.data) {
        // for pagination should be without 33-35
        for (const flat of action.data) {
          flatsArray.push(flat);
        }
        flatsArray.forEach((element, index) => {
          element.id = Number(String(Date.now()) + String(index));
        });
      }
      return {
        ...state,
        flats: flatsArray,
      };
    }

    case SET_PAGES: {
      return {
        ...state,
        maxPages: action.data,
      };
    }

    case TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.data,
      };
    }

    case SET_FLATS_QUANTITY: {
      return {
        ...state,
        flatsQuantity: action.data,
      };
    }

    case SET_LOCATION: {
      return {
        ...state,
        location: action.data,
      };
    }

    case SET_BACK_ADDRESS: {
      return {
        ...state,
        backAddress: action.data,
      };
    }

    case SET_IS_NO_RESULT: {
      return {
        ...state,
        isNoResult: action.data,
      };
    }

    default:
      return state;
  }
}
