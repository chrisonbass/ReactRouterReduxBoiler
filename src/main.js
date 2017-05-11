import Modernize from './util/Modernize';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Maps the state to props, just pass in a React Component 
import mapper from './container';
import Home from './components/Home';
import store, { history } from './store';

var $ = jQuery || {};

$(document).ready(() => {
  setTimeout( () => {
    $("#loading-screen").remove();
  }, 500 );
  // Render App
  render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={mapper(Home)}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')                
  );
});
