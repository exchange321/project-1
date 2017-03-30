/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import SearchResult from './SearchResult.jsx';

@connect(
  ({ searchPage: { results } }) => ({
    results,
  }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSearchResultClick = () => {
    this.props.routerActions.push('/watch');
  };

  render() {
    const { results } = this.props;
    return (
      <div className="search-result-container clearfix">
        { results.map((result, key) => (
          <SearchResult key={key} {...result} handleResultClick={this.handleSearchResultClick} />
        )) }
      </div>
    );
  }
}

export default SearchResults;
