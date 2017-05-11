import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
/* 
 * rootReducer from /reducers/index combines all
 * reducers into one and maintains the entire state
 * of the app
 */
import rootReducer from './reducers/index';
import {
  mainMiddleWare
} from './middleware/index';

export const history = createHistory();

const middleware = [mainMiddleWare, routerMiddleware(history)];

const defaultState = {
  count: [
    { label: 'Music', count: 0, selected: true },
    { label: 'Videos', count: 0, selected: false },
    { label: 'Artwork', count: 0, selected: false }
  ]
};

/* 
 * Redux DevTool (Chrome Plugin) this line of code
 * activates the plugin for debugging.  This should be
 * removed for live site
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  defaultState,
  composeEnhancers(
    applyMiddleware(
      ...middleware
    )
  )
);

export default store;
