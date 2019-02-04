/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/main';
import Bookmarks from './components/bookmarks';
import FlatPage from './components/flat-page';
import store from './redux/_store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/bookmarks" component={Bookmarks} />
        <Route exact path="/flat-page/:id" component={FlatPage} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
