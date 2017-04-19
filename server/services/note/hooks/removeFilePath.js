'use strict';

// src\services\note\hooks\removeFilePath.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve) => {
      const { data } = hook.result;
      for (let i = 0; i < data.length; i++ ) {
        if (data[i].filePath) {
          delete data[i].filePath;
        }
      }
      resolve(hook);
    });
  };
};
