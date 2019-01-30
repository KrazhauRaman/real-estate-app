/* eslint-disable func-names */
import {
  SET_FLATS,
  SET_PAGES,
  TOGGLE_LOADING,
  SET_CURRENT_PAGE,
  SET_FLATS_QUANTITY,
  SET_LOCATION,
} from './_action-types';
import { getListOfFlats } from '../server-requests/get-data';


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

export const getFlats = newPageLoadingCallback => (dispatch, getState) => {
  const { location, flatsQuantity, currentPage } = getState().main;
  return getListOfFlats(flatsQuantity, location, currentPage)
    .then(res => res.json())
    .then((res) => {
      dispatch(setFlats(res.response.listings));
      if (flatsQuantity === 50) {
        dispatch(setPagesQuantity(res.response.total_pages));
      } else {
        newPageLoadingCallback();
      }
      dispatch(toggleLoading());
    })
    .catch(err => console.log(err));
};
