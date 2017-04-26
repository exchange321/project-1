'use strict';

const globalHooks = require('../../../hooks/index');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const registerUse = require('../../helpers/registerUser');
const disabled = require('../../helpers/disabled');
const populateVideoInfo = require('../../helpers/populateVideoInfo');

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  get: [
    disabled(),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    registerUse(),
  ],
  update: [
    disabled(),
  ],
  patch: [
    disabled(),
  ],
  remove: [
    disabled(),
  ]
};

exports.after = {
  all: [],
  find: [
    populateVideoInfo(),
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
