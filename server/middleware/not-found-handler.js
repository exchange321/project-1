'use strict';

const path = require('path');

module.exports = function() {
  return function(req, res, next) {
    const html = path.join('.', 'index.html');
    res.sendFile(html, { root: 'public' });
  };
};
