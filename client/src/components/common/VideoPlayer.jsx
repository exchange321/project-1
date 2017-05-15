/**
 * Created by Wayuki on 02-Apr-17.
 */
import React, { Component, PropTypes } from 'react';
import videoConnect from 'react-html5video';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCreateNewNote } from '../../actions/videoNoteActions';
import { handleFavoriteButtonClick } from '../../actions/videoPageActions';

@connect(
  ({
     videoNote: {
       show: showModal,
     },
    videoPage: {
       favorite,
    },
  }) => ({
    showModal,
    favorite,
  }),
  dispatch => ({
    videoNoteActions: bindActionCreators({ handleCreateNewNote }, dispatch),
    videoPageActions: bindActionCreators({ handleFavoriteButtonClick }, dispatch),
  }),
)
class VideoPlayer extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
    videoNoteActions: PropTypes.shape({
      handleCreateNewNote: PropTypes.func.isRequired,
    }).isRequired,
    videoPageActions: PropTypes.shape({
      handleFavoriteButtonClick: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.showModal && !nextProps.showModal) {
      if (this.props.videoEl.duration !== this.props.videoEl.currentTime) {
        this.props.videoEl.play();
      }
    }
  }

  handleNoteTakingButtonClick = () => {
    const {
      videoEl,
      videoNoteActions: {
        handleCreateNewNote,
      },
    } = this.props;
    videoEl.pause();
    const time = videoEl.currentTime;
    const canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    handleCreateNewNote(time, canvas.toDataURL());
  };

  render() {
    const {
      video,
      children,
      videoEl,
      videoNoteActions,
      videoPageActions: {
        handleFavoriteButtonClick,
      },
      showModal,
      favorite,
      ...restProps
    } = this.props;
    return (
      <div className="video-container">
        <video {...restProps}>
          { children }
        </video>
        <div title="Take Note" className={`over-screen screenshot-container`}>
          <button onClick={this.handleNoteTakingButtonClick} className="btn btn-outline-primary btn-custom btn-lg">
            <i className="fa fa-sticky-note" />
          </button>
        </div>
        <div title={favorite ? "Unset Favorite" : "Set Favorite"} className={`over-screen favorite-container`}>
          <button onClick={handleFavoriteButtonClick} className={`btn btn-outline-danger btn-lg btn-custom ${favorite ? 'active' : ''}`}>
            <i className="fa fa-heart" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

export default videoConnect(VideoPlayer);
