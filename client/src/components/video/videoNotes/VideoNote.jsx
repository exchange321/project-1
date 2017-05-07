/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { PropTypes } from 'react';

const VideoNote = ({ onNoteClick, _id, imgUrl, title, note }) => (
  <div
    className="video-note-container clearfix"
    onClick={() => onNoteClick(_id)}
  >
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
        <div className="thumbnail">
          <img src={imgUrl} alt={title} className="img-fluid" />
        </div>
      </div>
      <div className="note-content col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
        <div className="note-content-inner">
          <p className="lead note-title">{ title }</p>
          <p className="note-note">{ note }</p>
        </div>
      </div>
    </div>
  </div>
);

VideoNote.propTypes = {
  onNoteClick: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default VideoNote;
