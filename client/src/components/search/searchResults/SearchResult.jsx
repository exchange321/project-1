/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { PropTypes } from 'react';

const SearchResult = ({ title, description, videoId, handleResultClick }) => (
  <div className="search-result clearfix" onClick={(e) => handleResultClick(videoId)}>
    <div className="row">
      <div className="thumbnail col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3" />
      <div className="result-info col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
        <div className="result-title">
          <h2>{ title }</h2>
        </div>
        <div className="result-desc">
          <p className="text-justify">{ description }</p>
        </div>
      </div>
    </div>
  </div>
);

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  handleResultClick: PropTypes.func.isRequired,
};

export default SearchResult;
