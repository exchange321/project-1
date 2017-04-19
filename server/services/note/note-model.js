'use strict';

// note-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    'default': Date.now,
  },
  updatedAt: {
    type: Date,
    'default': Date.now,
  },
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;