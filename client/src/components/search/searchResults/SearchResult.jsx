/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { PropTypes } from 'react';

const SearchResult = ({ className, title, description, videoId, thumbnail, handleResultClick }) => (
  <div className={`search-result clearfix ${className}`} onClick={(e) => handleResultClick(videoId)}>
    <div className="row">
      <div className="thumbnail col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
        <img className="img-fluid" width="120" height="90" src={thumbnail} alt={title} />
      </div>
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
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  handleResultClick: PropTypes.func.isRequired,
};

export default SearchResult;
