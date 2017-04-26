'use strict';

// history-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now }
});

const historyModel = mongoose.model('history', historySchema);

module.exports = historyModel;