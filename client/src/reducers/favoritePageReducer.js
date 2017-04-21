/**
 * Created by Wayuki on 4/21/2017.
 */
import initialState from './initialState';
import { FAVORITE_PAGE_ACTIONS } from '../actions/actionTypes';

const favoritePageReducer = (state = initialState.favoritePage, action) => {
  switch (action.type) {
    case FAVORITE_PAGE_ACTIONS.REGISTER_FAVORITES: {
      return {
        ...state,
        favorites: action.favorites,
      };
    }

    default: {
      return state;
    }
  }
};

export default favoritePageReducer;
