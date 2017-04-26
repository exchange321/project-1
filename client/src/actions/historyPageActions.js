/**
 * Created by Wayuki on 4/21/2017.
 */
import { HISTORY_PAGE_ACTIONS } from './actionTypes';

export const registerHistory = histories => ({
  type: HISTORY_PAGE_ACTIONS.REGISTER_HISTORIES,
  histories,
});

export default () => {};
