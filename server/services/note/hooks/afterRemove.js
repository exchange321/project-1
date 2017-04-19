'use strict';

const fs = require('fs');

// src\services\note\hooks\afterRemove.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve) => {
      const { filePath } = hook.result;
      fs.unlink(filePath, (err) => {
        if (err) {
          reject();
        } else {
          resolve(hook);
        }
      })
    });
  };
};
