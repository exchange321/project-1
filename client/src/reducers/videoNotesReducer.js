/**
 * Created by Wayuki on 17-Apr-17.
 */
import initialState from './initialState';
import { VIDEO_NOTES_ACTIONS } from '../actions/actionTypes';

const videoNotesReducer = (state = initialState.videoNotes, action) => {
  switch (action.type) {
    case VIDEO_NOTES_ACTIONS.REGISTER_NOTES: {
      return {
        ...state,
        notes: action.notes,
      }
    }

    default: {
      return state;
    }
  }
};

export default videoNotesReducer;