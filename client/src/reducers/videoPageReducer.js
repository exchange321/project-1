/**
 * Created by Wayuki on 02-Apr-17.
 */
import initialState from './initialState';
import { VIDEO_PAGE_ACTIONS } from '../actions/actionTypes';

const videoPageReducer = (state = initialState.videoPage, action) => {
  switch (action.type) {
    case VIDEO_PAGE_ACTIONS.PAGE_ENTERED: {
      return {
        ...state,
        isOnPage: true,
      };
    }

    case VIDEO_PAGE_ACTIONS.REGISTER_VIDEO: {
      if (state.isOnPage) {
        return {
          ...state,
          src: action.src,
          isVideoLoaded: true,
        };
      }
      return state;
    }

    case VIDEO_PAGE_ACTIONS.REGISTER_VIDEO_INFO: {
      if (state.isOnPage) {
        return {
          ...state,
          videoId: action.videoId,
          video: action.video,
        };
      }
      return state;
    }

    case VIDEO_PAGE_ACTIONS.SET_FAVORITE_STATE: {
      return {
        ...state,
        favorite: action.favorite,
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
