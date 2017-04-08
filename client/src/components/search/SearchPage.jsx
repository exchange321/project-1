/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import SearchResults from './searchResults/index.jsx';

@connect(
  null,
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class SearchPage extends Component {
  componentDidMount() {
    const redirect = window.localStorage.getItem("redirect");
    if (redirect) {
      window.localStorage.removeItem("redirect");
      window.localStorage.setItem("redirected", "true");
      this.props.routerActions.replace(redirect);
    }
  }

  render() {
    return (
      <div className="search container">
        <SearchResults />
      </div>
    );
  }
}

export default SearchPage;
