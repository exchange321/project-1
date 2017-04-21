/**
 * Created by Wayuki on 4/21/2017.
 */
import { FAVORITE_PAGE_ACTIONS } from './actionTypes';

export const registerFavorite = favorites => ({
  type: FAVORITE_PAGE_ACTIONS.REGISTER_FAVORITES,
  favorites,
});

export default () => {};
