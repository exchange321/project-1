'use strict';

// src\services\note\hooks\beforePatch.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function(options) {

  return function(hook) {
    return new Promise((resolve, reject) => {
      const {
        title,
        note,
      } = hook.data;
      let hasError = false;
      const errors = {};
      if (title.trim().length < 1) {
        hasError = true;
        errors.title = 'Title cannot be blank. Please try again.';
      }
      if (note.trim().length < 1) {
        hasError = true;
        errors.note = 'Note cannot be blank. Please try again.';
      }
      if (hasError) {
        reject(Object.assign({}, errors, {
          message: 'Error happens when saving new note. Please try again.',
        }));
      } else {
        resolve(hook);
      }
    });
  };
};
