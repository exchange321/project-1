/**
 * Created by Wayuki on 5/5/2017.
 */
import initialState from './initialState';
import { APP_PAGE_ACTIONS } from '../actions/actionTypes';

const appPageReducer = (state = initialState.appPage, action) => {
  switch (action.type) {
    case APP_PAGE_ACTIONS.TOGGLE_THEME: {
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    }

    default: {
      return state;
    }
  }
};

export default appPageReducer;