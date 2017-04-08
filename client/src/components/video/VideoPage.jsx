/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import VideoPlayback from './videoPlayback/index.jsx';
import VideoNotes from './videoNotes/index.jsx';

import AccordionCard from '../common/AccordionCard.jsx';

import * as actions from '../../actions/videoPageActions';

@connect(
  ({ videoPage }) => ({
    ...videoPage,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class VideoPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    videoId: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    isVideoLoaded: PropTypes.bool.isRequired,
    video: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      pageEntered: PropTypes.func.isRequired,
      registerVideo: PropTypes.func.isRequired,
      resetVideoPage: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      location: {
        search,
      },
      actions: {
        pageEntered,
        registerVideo,
      },
      routerActions: {
        replace,
      },
    } = this.props;
    pageEntered();
    const query = queryString.parse(search);
    if (!query.v || query.v.length < 1) {
      replace('/');
    } else {
      registerVideo(query.v);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetVideoPage();
  }

  render() {
    const {
      src,
      isVideoLoaded,
      video: {
        title,
        description,
      },
    } = this.props;
    return (
      <div className="video">
        <VideoPlayback src={src} isVideoLoaded={isVideoLoaded} />
        <div id="video-accordion" role="tablist" aria-multiselectable="true">
          <div className="container">
            <div className="cards">
              <AccordionCard
                parentId="video-accordion"
                headingId="video-description-accordion-heading"
                collapseId="video-description-accordion-collapse"
                headingText="Description"
                isDefault={true}
              >
                <div className="video-info">
                  <div className="video-title">
                    <h1>{ title }</h1>
                  </div>
                  <div className="video-description">
                    <p>{ description }</p>
                  </div>
                </div>
              </AccordionCard>
              <AccordionCard
                parentId="video-accordion"
                headingId="video-notes-accordion-heading"
                collapseId="video-notes-accordion-collapse"
                headingText="Notes"
                isDefault={false}
              >
                <VideoNotes />
              </AccordionCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPage;
