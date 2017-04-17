/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import app from '../../../feathers';

import * as videoNotesActions from '../../../actions/videoNotesActions';

import VideoNote from './VideoNote.jsx';

@connect(
  ({
    auth: {
      user: {
        _id,
      }
    },
     videoPage: {
      videoId,
     },
     videoNotes
  }) => ({
    userId: _id,
    videoId,
    ...videoNotes,
  }),
  dispatch => ({
    actions: bindActionCreators(videoNotesActions, dispatch),
  })
)
class VideoNotes extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.shape({
      imgUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
      registerNotes: PropTypes.func.isRequired,
      handleNoteClick: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidUpdate(prevProps) {
    const {
      userId,
      videoId,
      actions: {
        registerNotes,
      },
    } = this.props;
    if (!this.notes && userId && videoId) {
      this.notes = app.service('notes').find({
        query: {
          userId,
          videoId,
          $select: [
            'imgUrl',
            'title',
            'note',
          ],
        },
        rx: {
          listStrategy: 'always',
        },
      }).subscribe(({ data: notes }) => registerNotes(notes));
    }
  }

  componentWillUnmount() {
    if (this.notes) {
      this.notes.unsubscribe();
    }
  }

  render() {
    const {
      notes,
      actions: {
        handleNoteClick,
      },
    } = this.props;
    return (
      <div className="video-notes-container">
        {
          notes.map((note) => (
            <VideoNote
              key={note._id}
              onNoteClick={handleNoteClick}
              {...note}
            />
          ))
        }
      </div>
    );
  }
}

export default VideoNotes;
