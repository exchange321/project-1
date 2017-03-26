/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { PropTypes } from 'react';

const LoginPage = () => (
  <div className="login-container">
    <div className="login">
      <div className="login-link-container">
        <a href="#" className="google-login-link login-link">Google Login</a>
      </div>
      <div className="login-link-container">
        <a href="#" className="facebook-login-link login-link">Facebook Login</a>
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {};

export default LoginPage;
