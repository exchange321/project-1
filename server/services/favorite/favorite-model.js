'use strict';

// favorite-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now }
});

const favoriteModel = mongoose.model('favorite', favoriteSchema);

module.exports = favoriteModel;