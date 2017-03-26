/**
 * Created by Wayuki on 26-Mar-17.
 */
import app from '../feathers';
import { AUTH_ACTIONS } from './actionTypes';

export const authenticate = (token = undefined) => dispatch =>
  new Promise((resolve, reject) => {
    app.authenticate(
      token ? { type: 'token', token } : undefined,
    ).then(({ data }) => {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_USER,
        user: data,
      });
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });

export const logout = () => dispatch =>
  new Promise((resolve, reject) => {
    app.logout().then(() => {
      dispatch({
        type: AUTH_ACTIONS.LOGOUT_USER,
      });
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });

export default () => {};
