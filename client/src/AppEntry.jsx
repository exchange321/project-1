/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';
import { Provider } from 'react-redux';

import { feathersAuthentication } from './feathers';
import configureStore from './store/configureStore';

import AppRoutes from './AppRoutes.jsx';

const store = configureStore();

if (localStorage['feathers-jwt']) {
  store.dispatch(feathersAuthentication.authenticate()).catch((err) => {
    return err;
  });
}

const AppEntry = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default AppEntry;
