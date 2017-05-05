/**
 * Created by Wayuki on 5/5/2017.
 */
import { APP_PAGE_ACTIONS } from './actionTypes';

export const toggleTheme = () => (
  (dispatch, getState) => {
    const {
      darkTheme,
    } = getState().appPage;
    if (darkTheme) {
      localStorage.removeItem("darkTheme");
    } else {
      localStorage.setItem("darkTheme", "true");
    }
    dispatch({
      type: APP_PAGE_ACTIONS.TOGGLE_THEME,
    });
  }
);

export default () => {};
