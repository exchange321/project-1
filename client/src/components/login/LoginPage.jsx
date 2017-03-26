/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginPageActions from '../../actions/loginPageActions';

import { PageForGuestOnly } from '../../auth';

@connect(null, dispatch => ({
  actions: bindActionCreators(loginPageActions, dispatch),
}))
@PageForGuestOnly
class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    if (props.success !== null) {
      props.actions.handleLogin(props.success);
    }
  }

  static propTypes = {
    success: PropTypes.bool,
    actions: PropTypes.shape({
      handleLogin: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className="login-container">
        <div className="login">
          <div className="login-link-container">
            <a href="/auth/google" className="google-login-link login-link">Google Login</a>
          </div>
          <div className="login-link-container">
            <a href="/auth/facebook" className="facebook-login-link login-link">Facebook Login</a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
