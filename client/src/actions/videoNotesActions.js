/**
 * Created by Wayuki on 17-Apr-17.
 */
import { VIDEO_NOTES_ACTIONS } from './actionTypes';
import * as videoNoteActions from './videoNoteActions';

export const registerNotes = notes => ({
  type: VIDEO_NOTES_ACTIONS.REGISTER_NOTES,
  notes,
});

export const handleNoteClick = noteId => (
  (dispatch, getState) => {
    const { notes } = getState().videoNotes;
    const { _id: id, imgUrl, title, note } = notes.filter(note => note._id === noteId)[0];
    dispatch(videoNoteActions.registerEditingNote({
      id,
      imgUrl,
      title,
      note,
    }));
  }
);

export default () => {};
