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
    let search = '?';
    Object.keys(newLoc.query).forEach((key, index) => {
      if (key === "redirect") {
        window.localStorage.setItem("redirect", newLoc.query[key]);
      }
      search += `${key}=${newLoc.query[key]}`;
      if (Object.keys(newLoc.query).length > index + 1) {
        search += '&';
      }
    });
    const location = {
      ...newLoc,
      search,
    };
    dispatch(routerActions.replace(location));
  },
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
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
});

export default {};
