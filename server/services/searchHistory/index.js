'use strict';

const service = require('feathers-mongoose');
const searchHistory = require('./searchHistory-model');
const hooks = require('./hooks/index');

module.exports = function() {
  const app = this;

  const options = {
    Model: searchHistory,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/searchHistories', service(options));

  // Get our initialize service to that we can bind hooks
  const searchHistoryService = app.service('/searchHistories');

  // Set up our before hooks
  searchHistoryService.before(hooks.before);

  // Set up our after hooks
  searchHistoryService.after(hooks.after);
};
