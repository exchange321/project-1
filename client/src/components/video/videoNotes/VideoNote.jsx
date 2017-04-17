/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { PropTypes } from 'react';

const VideoNote = ({ imgUrl, title, note }) => (
  <div className="video-note-container clearfix">
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
        <div className="thumbnail">
          <img src={imgUrl} alt={title} className="img-fluid" />
        </div>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
        <p className="lead">{ title }</p>
        <p>{ note }</p>
      </div>
    </div>
  </div>
);

VideoNote.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default VideoNote;
