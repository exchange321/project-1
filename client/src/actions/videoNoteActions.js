/**
 * Created by Wayuki on 15-Apr-17.
 */
import { VIDEO_NOTE_ACTIONS } from './actionTypes';

export const handleModalToggle = () => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_MODAL_TOGGLE,
});

export const handleFormFieldValueChange = (key, value) => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_FORM_FIELD_VALUE_CHANGE,
  key,
  value,
});

export const handleCreateNewNote = (imgUrl) => ({
  type: VIDEO_NOTE_ACTIONS.HANDLE_CREATE_NEW_NOTE,
  imgUrl,
});

export const handleDeleteNote = () => (
  dispatch => new Promise((resolve) => {
    console.log('Deleting...');
    setTimeout(() => {
      console.log('Deleted');
      resolve();
    }, 1000);
  })
);

export const handleFormSubmit = () => (
  dispatch => new Promise((resolve) => {
    console.log('Submitting...');
    setTimeout(() => {
      console.log('Submitted');
      resolve();
    }, 1000);
  })
);

export const resetNote = () => ({
  type: VIDEO_NOTE_ACTIONS.RESET_NOTE,
});

export default () => {};