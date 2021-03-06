/**
 * Created by Wayuki on 24-Mar-17.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import { middleware as idleMiddleware } from '../idle-monitor';

import rootReducer from '../reducers';

export const history = createHistory();

const configureStore = initialState => (
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, idleMiddleware, reduxPromiseMiddleware(), routerMiddleware(history)),
    ),
  )
);

export default configureStore;
