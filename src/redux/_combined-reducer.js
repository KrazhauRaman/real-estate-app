import { combineReducers } from 'redux';
import bookmarks from './bookmarks-reducer';
import main from './main-reducer';

export default combineReducers({
  bookmarks,
  main,
});
