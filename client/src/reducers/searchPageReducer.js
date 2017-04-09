/**
 * Created by Wayuki on 25-Mar-17.
 */
import initialState from './initialState';
import { SEARCH_PAGE_ACTIONS } from '../actions/actionTypes';

const searchPageReducer = (state = initialState.searchPage, action) => {
  switch (action.type) {
    case SEARCH_PAGE_ACTIONS.HANDLE_QUERY_CHANGE: {
      return {
        ...state,
        query: action.value,
        words: action.words,
      };
    }

    case SEARCH_PAGE_ACTIONS.REGISTER_QUERY_RESULTS: {
      return {
        ...state,
        results: action.results,
      };
    }

    case SEARCH_PAGE_ACTIONS.REGISTER_CARET_POSITION: {
      return {
        ...state,
        inputbox: {
          ...state.inputbox,
          caretPosition: action.caretPosition,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default searchPageReducer;
