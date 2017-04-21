'use strict';

// src\services\note\hooks\setFavorite.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html


module.exports = function() {

  return function(hook) {
    return new Promise((resolve, reject) => {
      const { videoId, userId } = hook.data;
      hook.app.service('favorites').create({
        videoId,
        userId,
      }).then(() => {
        resolve(hook);
      }).catch(() => {
        reject({
          message: 'We have encountered problems when setting favorites. Please try again.'
        })
      });
    });
  };
};
