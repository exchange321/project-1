'use strict';

const service = require('feathers-mongoose');
const spellCorrectionHistory = require('./spellCorrectionHistory-model');
const hooks = require('./hooks/index');

module.exports = function() {
  const app = this;

  const options = {
    Model: spellCorrectionHistory,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/spellCorrectionHistories', service(options));

  // Get our initialize service to that we can bind hooks
  const spellCorrectionHistoryService = app.service('/spellCorrectionHistories');

  // Set up our before hooks
  spellCorrectionHistoryService.before(hooks.before);

  // Set up our after hooks
  spellCorrectionHistoryService.after(hooks.after);
};
