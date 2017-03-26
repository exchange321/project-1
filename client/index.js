/**
 * Created by Wayuki on 24-Mar-17.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import AppEntry from './src/AppEntry.jsx'; // eslint-disable-line import/extensions

window.jQuery = window.$ = require('jquery'); // eslint-disable-line no-multi-assign
window.Tether = require('tether');
require('bootstrap');

render(React.createElement(AppEntry), document.querySelector('#app'));
