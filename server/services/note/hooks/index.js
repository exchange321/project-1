'use strict';

const globalHooks = require('../../../hooks/index');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const generateScreenshot = require('./generateScreenshot');
const validation = require('./validation');
const removeScreenshot = require('./removeScreenshot');
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
    validation(),
    generateScreenshot(),
  ],
  update: [],
  patch: [
    validation(),
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
    removeScreenshot(),
  ],
};
