import { combineReducers } from 'redux';
import bookmakrsReducer from './bookmarks-reducer';
import mainReducer from './main-reducer';

export default combineReducers({
  bookmakrsReducer,
  mainReducer,
});
