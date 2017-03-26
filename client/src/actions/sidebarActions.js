/**
 * Created by Wayuki on 26-Mar-17.
 */
import { SIDEBAR_ACTIONS } from './actionTypes';

export const toggle = () => ({
  type: SIDEBAR_ACTIONS.TOGGLE,
});

export const set = open => ({
  type: SIDEBAR_ACTIONS.SET,
  open,
});

export default () => {};
