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
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
      snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnails: PropTypes.shape({
          medium: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  getInfoFromResult = result => ({
    videoId: result.id.videoId,
    title: result.snippet.title || "",
    description: result.snippet.description || "",
    thumbnail: result.snippet.thumbnails.medium.url || result.snippet.thumbnails.high.url || result.snippet.thumbnails.default.url,
  });

  handleSearchResultClick = (videoId) => {
    this.props.routerActions.push(`/watch?v=${videoId}`);
  };

  render() {
    const { results } = this.props;
    return (
      <div className="search-result-container clearfix">
        { results.map((result, key) => (
          <SearchResult key={key} className={`clear-${key % 2}`} {...(this.getInfoFromResult(result))} handleResultClick={this.handleSearchResultClick} />
        )) }
      </div>
    );
  }
}

export default SearchResults;
