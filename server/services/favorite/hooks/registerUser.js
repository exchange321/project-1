'use strict';

// src\services\favorite\hooks\registerUser.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve, reject) => {
      if (hook.params.user._id) {
        hook.data.userId = hook.params.user._id;
        resolve(hook);
      } else {
        reject('You are not authenticated.');
      }
    });
  };
};
