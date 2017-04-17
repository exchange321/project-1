/**
 * Created by Wayuki on 17-Apr-17.
 */
import { VIDEO_NOTES_ACTIONS } from './actionTypes';

export const registerNotes = notes => ({
  type: VIDEO_NOTES_ACTIONS.REGISTER_NOTES,
  notes,
});

export default () => {};
