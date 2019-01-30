import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from './_action-types';

const initialState = {
  bookmarks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKMARK: {
      const newBookmarksArr = [...state.bookmarks];
      newBookmarksArr.push(action.data);
      return {
        ...state,
        bookmarks: newBookmarksArr,
      };
    }

    case REMOVE_BOOKMARK: {
      const newBookmarksArr = state.bookmarks.filter(bookmark => bookmark.id !== action.data);
      return {
        ...state,
        bookmarks: newBookmarksArr,
      };
    }

    default:
      return state;
  }
}
