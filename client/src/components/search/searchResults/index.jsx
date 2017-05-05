/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import ListResult from '../../common/ListResult.jsx';

@connect(
  ({ searchPage: { results }, appPage: { stage } }) => ({
    results,
    idle: stage === 2,
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
    idle: PropTypes.bool.isRequired,
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
    const { results, idle } = this.props;
    return (
      <div className="search-result-container page clearfix">
        { results.map((result, key) => (
          <ListResult
            key={key}
            className={`clear-${key % 2} ${key === 0 && idle ? 'idle' : ''}`}
            {...(this.getInfoFromResult(result))}
            usePreview={false}
            handleResultClick={this.handleSearchResultClick}
          />
        )) }
      </div>
    );
  }
}

export default SearchResults;
