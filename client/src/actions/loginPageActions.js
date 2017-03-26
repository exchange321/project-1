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
        toastr.success('You are authenticated. Redirecting to Homepage.');
        dispatch(routerActions.replace('/'));
      }).catch(() => {
        toastr.error('Errors occurred when authenticating. Please try again.');
      });
    } else {
      toastr.error('Errors occurred when authenticating. Please try again.');
    }
  }
);

export default () => {};
