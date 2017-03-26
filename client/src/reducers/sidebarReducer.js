/**
 * Created by Wayuki on 26-Mar-17.
 */
import initialState from './initialState';
import { SIDEBAR_ACTIONS } from '../actions/actionTypes';

const sidebarReducer = (state = initialState.sidebar, action) => {
  switch (action.type) {
    case SIDEBAR_ACTIONS.TOGGLE: {
      return {
        ...state,
        open: !state.open,
      };
    }
    case SIDEBAR_ACTIONS.SET: {
      return {
        ...state,
        open: action.open,
      };
    }
    default: {
      return state;
    }
  }
};

export default sidebarReducer;
