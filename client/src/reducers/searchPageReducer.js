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
      };
    }

    case SEARCH_PAGE_ACTIONS.REGISTER_QUERY_RESULTS: {
      return {
        ...state,
        results: action.results,
      };
    }

    default: {
      return state;
    }
  }
};

export default searchPageReducer;
