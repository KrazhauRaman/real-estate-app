import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from './_action-types';

export const setBookmark = bookmark => ({
  type: ADD_BOOKMARK,
  data: bookmark,
});

export const deleteBookmark = id => ({
  type: REMOVE_BOOKMARK,
  data: id,
});

export const saveBookmark = bookmark => (dispatch, getState) => {
  dispatch(setBookmark(bookmark));
  localStorage.setItem('bookmarks', JSON.stringify(getState().bookmarks.bookmarks));
};

export const removeBookmark = id => (dispatch, getState) => {
  dispatch(deleteBookmark(id));
  localStorage.setItem('bookmarks', JSON.stringify(getState().bookmarks.bookmarks));
};
