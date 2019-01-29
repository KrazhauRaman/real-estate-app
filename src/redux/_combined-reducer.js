import { combineReducers } from 'redux';
import bookmakrs from './bookmarks-reducer';
import main from './main-reducer';

export default combineReducers({
  bookmakrs,
  main,
});
