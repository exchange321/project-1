/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';
import { Switch, Route } from 'react-router';

import SearchPage from './search/SearchPage.jsx';
import VideoPage from './video/VideoPage.jsx';
import LoginPage from './login/LoginPage.jsx';
import NotFoundPage from './404/NotFoundPage.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/video" component={VideoPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
