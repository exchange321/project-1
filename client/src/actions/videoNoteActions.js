/**
 * Created by Wayuki on 15-Apr-17.
 */
import { VIDEO_NOTE_ACTIONS } from './actionTypes';
import app from '../feathers';

export const handleModalToggle = () => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_MODAL_TOGGLE,
});

export const handleFormFieldValueChange = (key, value) => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_FORM_FIELD_VALUE_CHANGE,
  key,
  value,
});

export const registerEditingNote = note => ({
  type: VIDEO_NOTE_ACTIONS.REGISTER_EDITING_NOTE,
  note,
});

export const handleCreateNewNote = (imgUrl) => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_CREATE_NEW_NOTE,
  imgUrl,
});

export const handleDeleteNote = noteId => (
  dispatch => new Promise((resolve, reject) => {
    app.service('notes').remove(noteId).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  })
);

export const handleFormSubmit = () => (
  (dispatch, getState) => new Promise((resolve, reject) => {
    const { newNote, id } = getState().videoNote;
    if (!newNote && id.length > 0) {
      const { imgUrl, title, note } = getState().videoNote;
      app.service('notes').patch(id, {
        imgUrl,
        title,
        note,
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    } else {
      const userId = getState().auth.user._id;
      const videoId = getState().videoPage.videoId;
      const { imgUrl, title, note } = getState().videoNote;
      const request = {
        videoId,
        userId,
        imgUrl,
        title,
        note,
      };
      app.service('notes').create(request).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }
  })
);

export const registerError = errors => ({
  type: VIDEO_NOTE_ACTIONS.REGISTER_ERRORS,
  errors,
});

export const resetNote = () => ({
  type: VIDEO_NOTE_ACTIONS.RESET_NOTE,
});

export default () => {};