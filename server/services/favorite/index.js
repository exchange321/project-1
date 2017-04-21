'use strict';

const service = require('feathers-mongoose');
const favorite = require('./favorite-model');
const hooks = require('./hooks/index');

module.exports = function() {
  const app = this;

  const options = {
    Model: favorite,
    paginate: {
      default: 50,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/favorites', service(options));

  // Get our initialize service to that we can bind hooks
  const favoriteService = app.service('/favorites');

  // Set up our before hooks
  favoriteService.before(hooks.before);

  // Set up our after hooks
  favoriteService.after(hooks.after);
};
