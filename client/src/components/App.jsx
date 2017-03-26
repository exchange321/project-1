/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkThemeBase from 'material-ui/styles/baseThemes/darkBaseTheme';

import Sidebar from './sidebar/index.jsx';

import SearchPage from './search/SearchPage.jsx';
import VideoPage from './video/VideoPage.jsx';
import LoginPage from './login/LoginPage.jsx';
import NotFoundPage from './404/NotFoundPage.jsx';

import SearchBar from "./search/searchBar/index.jsx";

import { PageForUserOnly } from '../auth';

const App = ({ location }) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkThemeBase)}>
      <div className="app-container">
        <Sidebar />
        { location.pathname !== '/login' ? <SearchBar location={location} /> : '' }
        <Switch>
          <Route exact path="/" component={PageForUserOnly(SearchPage)} />
          <Route exact path="/login" render={() => (
            <LoginPage success={null} />
          )} />
          <Route exact path="/login/success" render={() => (
            <LoginPage success={true} />
          )} />
          <Route exact path="/login/failure" render={() => (
            <LoginPage success={false} />
          )} />
          <Route exact path="/video" component={PageForUserOnly(VideoPage)} />
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
