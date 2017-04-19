/**
 * Created by Wayuki on 02-Apr-17.
 */
import React, { Component, PropTypes } from 'react';
import videoConnect from 'react-html5video';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCreateNewNote } from '../../actions/videoNoteActions';

@connect(
  ({ videoNote: { show: showModal } }) => ({
    showModal,
  }),
  dispatch => ({
    videoNoteActions: bindActionCreators({ handleCreateNewNote }, dispatch),
  }),
)
class VideoPlayer extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    videoNoteActions: PropTypes.shape({
      handleCreateNewNote: PropTypes.func.isRequired,
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
      this.props.videoEl.play();
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
      showModal,
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
        <div className={`capture-frame-container ${mouseMoving ? "mouse-moved" : ""}`}>
          <button onClick={this.handleNoteTakingButtonClick} className="btn btn-outline-primary btn-lg"><i className="fa fa-sticky-note" /></button>
        </div>
      </div>
    );
  }
}

export default videoConnect(VideoPlayer);
