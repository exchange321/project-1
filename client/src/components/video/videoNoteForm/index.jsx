import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import TextInput from '../../common/TextInput.jsx';
import TextareaInput from '../../common/TextareaInput.jsx';

import * as videoNoteActions from '../../../actions/videoNoteActions';

@connect(
  ({ videoNote }) => ({
    ...videoNote,
  }),
  dispatch => ({
    actions: bindActionCreators(videoNoteActions, dispatch),
  }),
)
class VideoNoteForm extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    newNote: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      handleModalToggle: PropTypes.func.isRequired,
      handleFormFieldValueChange: PropTypes.func.isRequired,
      handleDeleteNote: PropTypes.func.isRequired,
      handleFormSubmit: PropTypes.func.isRequired,
      resetNote: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleFormFieldValueChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    this.props.actions.handleFormFieldValueChange(key, value);
  };

  handleDeleteNote = () => {
    $(".btn-delete, .btn-submit").prop("disabled", true);
    $(".btn-delete").addClass("progress-bar-striped progress-bar-animated");
    this.props.actions.handleDeleteNote().then(() => {
      $(".btn-delete, .btn-submit").prop("disabled", false);
      $(".btn-delete").removeClass("progress-bar-striped progress-bar-animated");
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    $(".btn-delete, .btn-submit").prop("disabled", true);
    $(".btn-submit").addClass("progress-bar-striped progress-bar-animated");
    this.props.actions.handleFormSubmit().then(() => {
      $(".btn-delete, .btn-submit").prop("disabled", false);
      $(".btn-submit").removeClass("progress-bar-striped progress-bar-animated");
    });
  };

  render() {
    const {
      show,
      imgUrl,
      newNote,
      title,
      note,
      actions: {
        handleModalToggle,
      },
    } = this.props;
    return (
      <div className="video-note">
        <Modal
          isOpen={show}
          toggle={handleModalToggle}
        >
          <form
            className="video-note-form"
            onSubmit={this.handleFormSubmit}
          >
            <ModalHeader toggle={handleModalToggle}>{ newNote ? "New Note" : "Edit Note" }</ModalHeader>
            <ModalBody>
                <div className="img-container">
                  <img className="img-responsive" src={imgUrl} alt="" />
                </div>
                <TextInput
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Please enter the title"
                  value={title}
                  onValueChange={this.handleFormFieldValueChange}
                />
                <TextareaInput
                  id="note"
                  label="Note"
                  placeholder="Please enter the note"
                  value={note}
                  onValueChange={this.handleFormFieldValueChange}
                />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  type="button"
                  className="btn-delete"
                  color="danger"
                  onClick={this.handleDeleteNote}
                >
                  Delete Note
                </Button>
                <Button
                  type="submit"
                  className="btn-submit"
                  color="primary"
                >
                  Create Note
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default VideoNoteForm;
