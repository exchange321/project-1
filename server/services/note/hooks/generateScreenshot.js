'use strict';
const path = require('path');
const shortid = require('shortid');
const imageDataUri = require('image-data-uri');

const validate = require('./validate');

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
        note,
      } = hook.data;

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
    });
  };
};
