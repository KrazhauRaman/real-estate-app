
import {
  SET_FLATS, SET_PAGES, TOGGLE_LOADING, SET_CURRENT_PAGE, SET_FLATS_QUANTITY, SET_LOCATION,
} from './_action-types';

const initialState = {
  flats: [],
  maxPages: 0,
  isLoading: false,
  currentPage: 1,
  location: '',
  flatsQuantity: 20,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLATS: {
      return {
        ...state,
        flats: action.data,
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

    default:
      return state;
  }
}
