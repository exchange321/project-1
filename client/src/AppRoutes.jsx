/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store/configureStore';

import App from './components/App.jsx';

const AppRoutes = () => (
  <ConnectedRouter history={history}>
    <div>
      <Route path="/" component={App} />
    </div>
  </ConnectedRouter>
);

export default AppRoutes;
