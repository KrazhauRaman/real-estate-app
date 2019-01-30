import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_combined-reducer';

const initialState = {
  bookmarks: (localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : []),
};

const store = createStore(
  rootReducer,
  { bookmarks: initialState },
  applyMiddleware(thunk),
);


export default store;
