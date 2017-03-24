/**
 * Created by Wayuki on 24-Mar-17.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import './index.css';

import AppEntry from './src/AppEntry.jsx';

window.jQuery = window.$ = require('jquery');
window.Tether = require('tether');
require('bootstrap');

render(React.createElement(AppEntry), document.querySelector('#app'));
