/**
 * Created by Wayuki on 02-Apr-17.
 */
import React, { PropTypes } from 'react';
import videoConnect from 'react-html5video';

const VideoPlayer = ({ video, videoEl, children, ...restProps }) => (
  <div className="video-container">
    <video {...restProps}>
      { children }
    </video>
  </div>
);

VideoPlayer.propTypes = {};

export default videoConnect(VideoPlayer);
