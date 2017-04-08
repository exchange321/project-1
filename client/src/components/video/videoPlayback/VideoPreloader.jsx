/**
 * Created by Wayuki on 02-Apr-17.
 */
import React from 'react';

const VideoPreloader = () => (
  <div className="video-preloader">
    <div className="preloader">
      <img
        src={`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/assets/images/radio.gif`}
        alt="Ajax Loader"
        className="ajax-loader"
      />
      <p className="lead">Fetching Video from YouTube</p>
    </div>
  </div>
);

export default VideoPreloader;
