/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { PropTypes } from 'react';
import VideoPlayer from '../../common/VideoPlayer.jsx';
import VideoPreloader from './VideoPreloader.jsx';

const VideoPlayback = ({ src, isVideoLoaded }) => (
  <div className="video-playback-container">
    <div className="container">
      <div className="video-tag">
        {
          isVideoLoaded ? (
            <VideoPlayer
              autoPlay
              controls
              src={src}
            />
          ) : (
            <VideoPreloader />
          )
        }
      </div>
    </div>
  </div>
);

VideoPlayback.propTypes = {
  src: PropTypes.string.isRequired,
  isVideoLoaded: PropTypes.bool.isRequired,
};

export default VideoPlayback;
