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

    case APP_PAGE_ACTIONS.SET_STAGE: {
      return {
        ...state,
        stage: action.stage,
      };
    }

    default: {
      return state;
    }
  }
};

export default appPageReducer;
