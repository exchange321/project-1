'use strict';

const validate = require('./validate');

// src\services\note\hooks\beforePatch.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve, reject) => {
      const {
        title,
        note,
      } = hook.data;
      validate(title, note).then(() => {
        resolve(hook);
      }).catch((errors) => {
        reject(Object.assign({}, errors, {
          message: 'Error happens when saving new note. Please try again.',
        }));
      });
    });
  };
};
