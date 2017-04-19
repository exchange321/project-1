'use strict';

const globalHooks = require('../../../hooks/index');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const beforeCreate = require('./beforeCreate');
const beforePatch = require('./beforePatch');
const afterRemove = require('./afterRemove');
const removeFilePath = require('./removeFilePath');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [
    beforeCreate(),
  ],
  update: [],
  patch: [
    beforePatch(),
  ],
  remove: []
};

exports.after = {
  all: [  ],
  find: [
    removeFilePath(),
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [
    afterRemove(),
  ],
};
