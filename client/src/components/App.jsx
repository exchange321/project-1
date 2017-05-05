/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as idleActions } from '../idle-monitor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkThemeBase from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightThemeBase from 'material-ui/styles/baseThemes/lightBaseTheme';

import Sidebar from './sidebar/index.jsx';

import SearchPage from './search/SearchPage.jsx';
import VideoPage from './video/VideoPage.jsx';
import FavoritePage from './favorite/FavoritePage.jsx';
import HistoryPage from './history/HistoryPage.jsx';
import LoginPage from './login/LoginPage.jsx';
import NotFoundPage from './404/NotFoundPage.jsx';

import SearchBar from "./search/searchBar/index.jsx";

import { PageForUserOnly } from '../auth';

import * as appPageActions from '../actions/appPageActions';

@connect(
  ({ appPage }) => ({
    ...appPage,
  }),
  dispatch => ({
    actions: bindActionCreators(appPageActions, dispatch),
    idleActions: bindActionCreators(idleActions, dispatch),
  }),
)
class App extends Component {
  static propTypes = {
    darkTheme: PropTypes.bool.isRequired,
    idleActions: PropTypes.shape({
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/' && this.props.location.pathname !== '/') {
      this.props.idleActions.start();
    }
    if (nextProps.location.pathname !== '/' && this.props.location.pathname === '/') {
      this.props.idleActions.stop();
    }
  }

  render() {
    const {
      location,
      darkTheme,
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkTheme ? darkThemeBase : lightThemeBase)}>
        <div className={`app-container ${darkTheme ? "dark-theme" : "light-theme"}`}>
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
            <Route exact path="/watch" component={PageForUserOnly(VideoPage)} />
            <Route exact path="/favorite" component={PageForUserOnly(FavoritePage)} />
            <Route exact path="/history" component={PageForUserOnly(HistoryPage)} />
            {/*<Route exact path="/404" component={NotFoundPage} />*/}
            {/*<Redirect to="/404" />*/}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
