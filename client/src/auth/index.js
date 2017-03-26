/**
 * Created by Wayuki on 03-Mar-17.
 */
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const PageForUserOnly = UserAuthWrapper({
  wrapperDisplayName: 'PageForUserOnly',
  authSelector: state => state.auth,
  predicate: auth => auth && auth.login,
  failureRedirectPath: '/login',
  redirectAction: newLoc => (dispatch) => {
    dispatch(routerActions.replace(newLoc));
  },
  allowRedirectBack: false,
});

export const ElementForUserOnly = UserAuthWrapper({
  wrapperDisplayName: 'ElementForUserOnly',
  authSelector: state => state.auth,
  predicate: auth => auth && auth.login,
  FailureComponent: null,
});

export const PageForGuestOnly = UserAuthWrapper({
  wrapperDisplayName: 'PageForGuestOnly',
  authSelector: state => state.auth,
  predicate: auth => !auth.login,
  failureRedirectPath: '/',
  redirectAction: newLoc => (dispatch) => {
    dispatch(routerActions.replace(newLoc));
  },
  allowRedirectBack: false,
});

export default {};
