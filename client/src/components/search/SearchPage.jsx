/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import SearchResults from './searchResults/index.jsx';

@connect(
  ({ appPage: { stage } }) => ({
    idle: stage === 3,
  }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class SearchPage extends Component {
  static propTypes = {
    idle: PropTypes.bool.isRequired,
    routerActions: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const redirect = window.localStorage.getItem("redirect");
    if (redirect) {
      window.localStorage.removeItem("redirect");
      window.localStorage.setItem("redirected", "true");
      this.props.routerActions.replace(redirect);
    }
  }

  render() {
    const { idle } = this.props;
    return (
      <div className="search container">
        <SearchResults />
        {
          idle ? (
            <div className="idleMask">
              <i className="fa fa-arrow-down" aria-hidden="true" />
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default SearchPage;
