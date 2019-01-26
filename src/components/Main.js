import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

// Maps the state to props, just pass in a React Component 
import Home from './pages/Home';
import store, { history } from '../store';

var domIsReady = (function(domIsReady) {
   var isBrowserIeOrNot = function() {
    return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
   }
   domIsReady = function(callback) {
    if(callback && typeof callback === 'function'){
     if(isBrowserIeOrNot() !== 'ie') {
      document.addEventListener("DOMContentLoaded", function(e) {
         return callback(e);
      });
     } else {
      document.attachEvent("onreadystatechange", function(e) {
         if(document.readyState === "complete") {
          return callback(e);
         }
      });
     }
    } else {
     console.error('The callback is not a function!');
    }
   }
   return domIsReady;
})(domIsReady || {});

export default () => {
  domIsReady(() => {
    // Render App
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('app')        
    );
  });
};
