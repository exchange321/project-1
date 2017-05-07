/**
 * Created by Wayuki on 5/5/2017.
 */
import configure from 'redux-idle-monitor';
import IDLE_STATUSES from './idleStatus';
import { idleStatusDelay, activeStatusAction, idleStatusAction } from './actions';

const activeEvents = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mouseWheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
];

const opts = {
  appName: 'videoApp',
  IDLE_STATUSES,
  idleStatusDelay,
  activeStatusAction,
  idleStatusAction,
  activeEvents,
};

const { middleware, reducer, actions } = configure(opts);
export { middleware, reducer, actions };
