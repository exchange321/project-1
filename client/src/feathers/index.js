/**
 * Created by Wayuki on 24-Mar-17.
 */
import feathers from 'feathers-client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

const socket = io(); // eslint-disable-line no-undef

const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(rx(RxJS))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage,
  }));

export default app;
