'use strict';

// spellCorrectionHistory-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spellCorrectionHistorySchema = new Schema({
  userId: { type: String, required: true },
  userWord: { type: String, required: true },
  fixedWord: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now }
});

const spellCorrectionHistoryModel = mongoose.model('spellCorrectionHistory', spellCorrectionHistorySchema);

module.exports = spellCorrectionHistoryModel;