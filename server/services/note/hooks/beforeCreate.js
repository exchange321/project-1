'use strict';
const path = require('path');
const shortid = require('shortid');
const imageDataUri = require('image-data-uri');

// src\services\note\hooks\extractImage.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function() {

  return function(hook) {
    return new Promise((resolve, reject) => {
      const {
        videoId,
        imgUrl,
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
        const id = shortid.generate();
        const imageFileName = `${id}-${videoId}.png`;
        const filePath = path.join(__dirname, '..', '..', '..', '..', 'assets', 'screenshots', imageFileName);
        imageDataUri.outputFile(imgUrl, filePath).then((res) => {
          hook.data = Object.assign({}, hook.data, {
            imgUrl: `http://${hook.app.get('host')}:${hook.app.get('port')}/assets/screenshots/${imageFileName}`,
            filePath: res,
          });
          resolve(hook);
        }).catch(() => {
          reject({
            message: 'Error happens when saving new note. Please try again.',
          })
        });
      }
    });
  };
};
