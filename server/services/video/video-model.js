'use strict';

// video-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String, required: true },
  filename: { type: String, required: true }
});

const videoModel = mongoose.model('video', videoSchema);

module.exports = videoModel;