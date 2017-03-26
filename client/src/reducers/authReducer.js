/**
 * Created by Wayuki on 26-Mar-17.
 */
import initialState from './initialState';
import { AUTH_ACTIONS } from '../actions/actionTypes';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.REGISTER_USER: {
      return {
        ...state,
        user: action.user,
        login: true,
      };
    }

    case AUTH_ACTIONS.LOGOUT_USER: {
      return {
        ...state,
        user: {},
        login: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
