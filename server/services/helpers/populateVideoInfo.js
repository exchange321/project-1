'use strict';

// src\services\favorite\hooks\populateVideoInfo.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve) => {
      if (hook.result.total <= 0) {
        resolve(hook);
      } else {
        let processed = 0;
        hook.result.data.forEach((favorite, key) => {
          hook.app.service('videos').find({
            query: {
              videoId: favorite.videoId,
            },
          }).then(({ total, data }) => {
            processed++;
            if (total > 0) {
              hook.result.data[key].title = data[0].title;
              if (data[0].description.length > 107) {
                data[0].description = data[0].description.slice(0, 104) + '...';
              }
              hook.result.data[key].description = data[0].description;
              hook.result.data[key].thumbnail = data[0].thumbnail;
              hook.result.data[key].preview = data[0].preview;
            }
            if (processed >= hook.result.data.length) {
              resolve(hook);
            }
          });
        });
      }
    });
  };
};
