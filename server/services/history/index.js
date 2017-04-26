'use strict';

const service = require('feathers-mongoose');
const history = require('./history-model');
const hooks = require('./hooks/index');

module.exports = function() {
  const app = this;

  const options = {
    Model: history,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/histories', service(options));

  // Get our initialize service to that we can bind hooks
  const historyService = app.service('/histories');

  // Set up our before hooks
  historyService.before(hooks.before);

  // Set up our after hooks
  historyService.after(hooks.after);
};
