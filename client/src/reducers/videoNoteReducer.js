/**
 * Created by Wayuki on 15-Apr-17.
 */
import initialState from './initialState';
import { VIDEO_NOTE_ACTIONS } from '../actions/actionTypes';

const VideoNoteReducer = (state = initialState.videoNote, action) => {
  switch (action.type) {
    case VIDEO_NOTE_ACTIONS.HANDLE_MODAL_TOGGLE: {
      return !state.show ? {
        ...state,
        show: !state.show,
      } : initialState.videoNote;
    }

    case VIDEO_NOTE_ACTIONS.HANDLE_FORM_FIELD_VALUE_CHANGE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }

    case VIDEO_NOTE_ACTIONS.REGISTER_EDITING_NOTE: {
      return {
        ...state,
        ...action.note,
        show: true,
        newNote: false,
      };
    }

    case VIDEO_NOTE_ACTIONS.HANDLE_CREATE_NEW_NOTE: {
      return {
        ...state,
        show: true,
        newNote: true,
        imgUrl: action.imgUrl,
      };
    }

    case VIDEO_NOTE_ACTIONS.REGISTER_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      }
    }

    case VIDEO_NOTE_ACTIONS.RESET_NOTE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default VideoNoteReducer;