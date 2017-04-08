/**
 * Created by Wayuki on 02-Apr-17.
 */
import initialState from './initialState';
import { VIDEO_PAGE_ACTIONS } from '../actions/actionTypes';

const videoPageReducer = (state = initialState.videoPage, action) => {
  switch (action.type) {
    case VIDEO_PAGE_ACTIONS.REGISTER_VIDEO: {
      return {
        ...state,
        videoId: action.videoId,
        src: action.src,
        isVideoLoaded: true,
      };
    }

    case VIDEO_PAGE_ACTIONS.RESET_VIDEO_PAGE: {
      return initialState.videoPage;
    }

    default: {
      return state;
    }
  }
};

export default videoPageReducer;
