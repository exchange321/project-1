/**
 * Created by Wayuki on 5/5/2017.
 */
import * as IDLE_STATUSES from './idleStatus';
import { setStage } from '../actions/appPageActions';

export const idleStatusDelay = idleStatus => () => { // eslint-disable-line consistent-return
  if (idleStatus === IDLE_STATUSES.STAGE_1) {
    return 5000;
  }
  if (idleStatus === IDLE_STATUSES.STAGE_2) {
    return 5000;
  }
  if (idleStatus === IDLE_STATUSES.STAGE_3) {
    return 5000;
  }
};

export const activeStatusAction = (dispatch) => {
  dispatch(setStage(0));
};

export const idleStatusAction = idleStatus => (dispatch) => {
  if (idleStatus === IDLE_STATUSES.STAGE_1) {
    dispatch(setStage(1));
  }
  if (idleStatus === IDLE_STATUSES.STAGE_2) {
    dispatch(setStage(2));
  }
  if (idleStatus === IDLE_STATUSES.STAGE_3) {
    dispatch(setStage(3));
  }
};

export default () => {};
