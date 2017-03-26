/**
 * Created by Wayuki on 24-Mar-17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { feathersAuthentication } from '../feathers';

import searchPage from './searchPageReducer';

const rootReducer = combineReducers({
  searchPage,
  auth: feathersAuthentication.reducer,
  routing: routerReducer,
});

export default rootReducer;
