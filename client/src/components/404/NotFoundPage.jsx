/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <h1 className="text-center display-1">404</h1>
    <p className="lead text-center">Page Not Found</p>
    <p className="text-center"><Link className="btn btn-outline-info" to="/">Return to Homepage</Link></p>
  </div>
);

export default NotFoundPage;
