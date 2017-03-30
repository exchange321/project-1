'use strict';

const service = require('feathers-mongoose');
const video = require('./video-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: video,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/videos', service(options));

  // Get our initialize service to that we can bind hooks
  const videoService = app.service('/videos');

  // Set up our before hooks
  videoService.before(hooks.before);

  // Set up our after hooks
  videoService.after(hooks.after);
};
