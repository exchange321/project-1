/**
 * Created by Wayuki on 24-Mar-17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import sidebar from './sidebarReducer';
import searchPage from './searchPageReducer';

const rootReducer = combineReducers({
  auth,
  sidebar,
  searchPage,
  routing: routerReducer,
});

export default rootReducer;
