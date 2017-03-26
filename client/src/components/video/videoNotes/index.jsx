/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { PropTypes } from 'react';

import VideoNote from './VideoNote.jsx';

const VideoNotes = () => (
  <div className="video-notes-container">
    { [1, 2, 3, 4, 5].map((value) => (
      <VideoNote key={value} />
      )) }
  </div>
);

VideoNotes.propTypes = {};

export default VideoNotes;
