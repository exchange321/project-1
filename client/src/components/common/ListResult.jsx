/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { PropTypes } from 'react';

const ListResult = ({ usePreview, className, title, description, videoId, thumbnail, handleResultClick, preview }) => (
  <div className={`list-result clearfix ${className}`} onClick={(e) => handleResultClick(videoId)}>
    <div className="row">
      <div className="thumbnail col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
        <img className="img-fluid" width="120" height="90" src={thumbnail} alt={title} />
      </div>
      <div className={`result-info col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 ${usePreview ? 'result-info-with-preview' : ''}`}>
        <div className="result-title">
          <h2>{ title }</h2>
        </div>
        {
          usePreview ? (
            <div className="result-preview">
              {
                preview.map((img, key) => (
                  <div key={key} className="preview-img-container">
                    <img className="img-fluid" src={img} alt={`${title} - preview ${key}`} />
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="result-desc">
              <p className="text-justify">{ description }</p>
            </div>
          )
        }
      </div>
    </div>
  </div>
);

ListResult.propTypes = {
  usePreview: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  handleResultClick: PropTypes.func.isRequired,
  preview: PropTypes.arrayOf(PropTypes.string),
};

export default ListResult;
