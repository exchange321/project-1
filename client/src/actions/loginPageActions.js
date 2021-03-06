/**
 * Created by Wayuki on 26-Mar-17.
 */
import toastr from 'toastr';
import { routerActions } from 'react-router-redux';

import * as helpers from '../../../helpers';
import * as authActions from './authActions';

export const handleLogin = success => (
  (dispatch) => {
    if (success) {
      const token = helpers.getCookieData('feathers-jwt');
      dispatch(authActions.authenticate(token)).then(() => {
        toastr.success('You are authenticated.');
        const redirect = window.localStorage.getItem('redirect');
        if (redirect) {
          window.localStorage.removeItem('redirect');
          dispatch(routerActions.replace(redirect));
        } else {
          if (!window.localStorage.getItem('redirected') || window.localStorage.getItem('redirected') !== 'true') { // eslint-disable-line no-lonely-if
            dispatch(routerActions.replace('/'));
          } else {
            window.localStorage.removeItem('redirected');
          }
        }
      }).catch(() => {
        toastr.error('Errors occurred when authenticating. Please try again.');
      });
    } else {
      toastr.error('Errors occurred when authenticating. Please try again.');
    }
  }
);

export default () => {};
