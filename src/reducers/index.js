import { combineReducers } from 'redux';
import * as reducers from './primary';

const rootReducer = combineReducers(
  Object.assign({},
    reducers
  ) 
);

export default rootReducer;
