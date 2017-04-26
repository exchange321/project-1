'use strict';

const globalHooks = require('../../../hooks/index');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const registerUser = require('../../helpers/registerUser');
const disabled = require('../../helpers/disabled');

exports.before = {
  all: [],
  find: [
    disabled(),
  ],
  get: [
    disabled(),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    registerUser(),
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
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
