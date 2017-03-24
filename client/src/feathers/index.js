/**
 * Created by Wayuki on 24-Mar-17.
 */
import feathers from 'feathers-client';
import reduxifyAuthentication from 'feathers-reduxify-authentication';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

const socket = io();

const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(rx(RxJS))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage,
  }));

export default app;

export const feathersAuthentication = reduxifyAuthentication(app, {
  isUserAuthorized: user => user.isVerified,
});
