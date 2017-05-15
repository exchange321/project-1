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

  componentDidUpdate() {
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
          $sort: {
            'time': 1,
          },
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

  handlePrintNote = () => {
    const videoNotes = $('.video-notes-container')[0];
    const pri = $('#ifmcontentstoprint')[0].contentWindow;

    const style = document.createElement('style');
    style.textContent = `
      .video-notes-container {
        width: 100%;
      }
      
      .video-note-container {
        width: 100%;
      }
      
      .row {
        position: relative;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      
      .row::after {
        content: '';
        display: block;
        clear: both;
      }
      
      .thumbnail {
        width: 30%;
        float: left;
      }
      
      img {
        width: 100%;
        height: auto;
      }
      
      .note-content {
        width: 70%;
        float: left;
      }
      
      .note-content-inner {
        padding-left: 15px;
      }
      
      .note-title {
        font-size: 24px;
        margin: 0 0 8px 0;
      }
      
      .note-note {
        font-size: 16px;
        margin: 0 0 5px 0;
      }
    `;

    pri.document.open();
    pri.document.write(videoNotes.innerHTML);
    pri.document.head.appendChild(style);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.document.write('');
  };

  render() {
    const {
      notes,
      actions: {
        handleNoteClick,
      },
    } = this.props;
    return (
      <div>
        {
          notes.length < 1 ? (
            <p className="lead">There is no note in this page.</p>
          ) : (
            <div>
              <div className="btn-print-container text-right">
                <button
                  className="btn btn-outline-primary btn-lg btn-custom"
                  onClick={this.handlePrintNote}
                >
                  <i className="fa fa-print" aria-hidden="true" /> <span>Print Notes</span>
                </button>
              </div>
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
            </div>
          )
        }
        <iframe id="ifmcontentstoprint" style={{
          height: 0,
          width: 0,
          position: 'absolute',
          display: 'none',
        }} />
      </div>
    );
  }
}

export default VideoNotes;
