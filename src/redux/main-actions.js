/* eslint-disable no-console */
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
import getListOfFlats from '../server-requests/get-data';


export const setFlats = flats => ({
  type: SET_FLATS,
  data: flats,
});

export const setPagesQuantity = pages => ({
  type: SET_PAGES,
  data: pages,
});

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  data: page,
});

export const setFlatsQuantity = quantity => ({
  type: SET_FLATS_QUANTITY,
  data: quantity,
});

export const setLocation = location => ({
  type: SET_LOCATION,
  data: location,
});

export const setIsNoResult = isNoResult => ({
  type: SET_IS_NO_RESULT,
  data: isNoResult,
});

export const getFlats = newPageLoadingCallback => (dispatch, getState) => {
  const { location, flatsQuantity, currentPage } = getState().main;
  return getListOfFlats(flatsQuantity, location, currentPage)
    .then(res => res.json())
    .then((res) => {
      dispatch(setFlats(res.response.listings));
      if (res.response.listings.length === 0) {
        dispatch(setIsNoResult(true));
      } else {
        dispatch(setIsNoResult(false));
      }
      if (flatsQuantity === 50) {
        dispatch(setPagesQuantity(res.response.total_pages));
      } else {
        newPageLoadingCallback();
      }
      dispatch(toggleLoading());
    })
    .catch(err => console.log(err));
};

export const setBackAddress = newAddress => ({
  type: SET_BACK_ADDRESS,
  data: newAddress,
});
