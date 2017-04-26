/**
 * Created by Wayuki on 4/26/2017.
 */
import initialState from './initialState';
import { HISTORY_PAGE_ACTIONS } from '../actions/actionTypes';

const historyPageReducer = (state = initialState.historyPage, action) => {
  switch (action.type) {
    case HISTORY_PAGE_ACTIONS.REGISTER_HISTORIES: {
      return {
        ...state,
        histories: action.histories,
      };
    }

    default: {
      return state;
    }
  }
};

export default historyPageReducer;
