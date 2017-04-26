'use strict';

// src\services\favorite\hooks\registerUser.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function() {
    return new Promise((resolve, reject) => {
      reject('This RESTful request is not allowed.');
    });
  };
};
