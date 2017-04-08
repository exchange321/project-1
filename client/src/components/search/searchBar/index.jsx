/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import toastr from 'toastr';

import * as searchPageActions from '../../../actions/searchPageActions';

import { ElementForUserOnly } from '../../../auth';

@connect(
  ({ searchPage: { query, results } }) => ({
    query,
    numResults: results.length,
  }),
  dispatch => ({
    actions: bindActionCreators(searchPageActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  })
)
@ElementForUserOnly
class SearchBar extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    query: PropTypes.string.isRequired,
    numResults: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      handleQueryChange: PropTypes.func.isRequired,
      handleQuerySubmit: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    $('#search-bar-query').focus();
  }

  handleQueryChange = (e) => {
    const { value } = e.target;
    this.props.actions.handleQueryChange(value);
  };

  handleQuerySubmit = (e) => {
    e.preventDefault();
    const {
      location: {
        pathname,
      },
      actions: {
        handleQueryChange,
        handleQuerySubmit,
      },
      routerActions: {
        push,
      },
    } = this.props;
    handleQuerySubmit().then(() => {
      if (pathname !== '/') {
        push('/');
      }
    }).catch((err) => {
      handleQueryChange("");
      toastr.error(err.message);
    });
  };

  render() {
    const {
      query,
      numResults,
      location,
    } = this.props;
    return (
      <div className={`search-bar-container ${(numResults > 0 || location.pathname !== '/') ? 'has-results' : ''}`}>
          <div className="search-bar container">
            <form onSubmit={this.handleQuerySubmit}>
              <div className="search-bar-inner input-group">
                <span className="input-group-addon">How to</span>
                <input
                  type="text"
                  id="search-bar-query"
                  className="form-control"
                  value={query}
                  onChange={this.handleQueryChange}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary"><i className="fa fa-search" /></button>
                </span>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default SearchBar;
