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

  constructor(props) {
    super(props);
    this.mousemoveCooldown = null;
    this.state = {
      mouseMoving: false,
    };
  }

  componentDidMount() {
    $(".video-container").mousemove(() => {
      this.setState({
        mouseMoving: true,
      });
      if (!this.mousemoveCooldown) {
        this.mousemoveCooldown = setTimeout(() => {
          this.setState({
            mouseMoving: false,
          });
          clearTimeout(this.mousemoveCooldown);
          this.mousemoveCooldown = null;
        }, 3000);
      }
    }).mouseleave(() => {
      this.setState({
        mouseMoving: false,
      });
      this.mousemoveCooldown = null;
    });
  }

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
    const {
      mouseMoving,
    } = this.state;
    return (
      <div className="video-container">
        <video {...restProps}>
          { children }
        </video>
        <div className={`over-screen screenshot-container ${mouseMoving ? "mouse-moved" : ""}`}>
          <button onClick={this.handleNoteTakingButtonClick} className="btn btn-outline-primary btn-lg">
            <i className="fa fa-sticky-note" />
          </button>
        </div>
        <div className={`over-screen favorite-container ${mouseMoving ? "mouse-moved" : ""}`}>
          <button onClick={handleFavoriteButtonClick} className={`btn btn-outline-danger btn-lg ${favorite ? 'active' : ''}`}>
            <i className="fa fa-heart" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

export default videoConnect(VideoPlayer);
