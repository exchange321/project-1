'use strict';
const authentication = require('./authentication');
const user = require('./user');
const video = require('./video');
const note = require('./note');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(authentication);
  app.configure(user);
  app.configure(video);
  app.configure(note);
};
