'use strict';
const fs = require('fs');
const path = require('path');
const youtubeDl = require('youtube-dl');

module.exports = function(app) {
  return function(req, res) {
    const videoId = req.query.v;
    const videos = app.service('videos');
    videos.find({
      query:{
        videoId,
      },
    }).then((data) => {
      if (data.total <= 0) {
        const url = `http://www.youtube.com/watch?v=${videoId}`;
        youtubeDl.getInfo(url, ['-f', 'best[filesize <=? 20M][height <= 360][ext=mp4]'], (err, info) => {
          if (err) {
            responseError(res, 'The video is too big or does not exist. Please try again.');
          } else {
            const filename = info._filename;
            const file = path.join(__dirname, '..', '..', 'assets', 'videos', filename);
            const video = youtubeDl(url, ['-f', 'best[filesize <=? 20M][height <= 480][ext=mp4]']);
            let error = false;
            video.on('info', (info) => {
              if (info.size > 20000000) {
                video.emit('error', {
                  message: 'The video is too long. Please try other videos.',
                });
              } else {
                video.pipe(fs.createWriteStream(file));
              }
            });
            video.on('error', (err) => {
              error = true;
              responseError(res, err.message);
            });
            video.on('end', () => {
              if (!error) {
                recordVideo(req, res, videos, {
                  videoId,
                  filename,
                });
              }
            });
          }
        });
      } else {
        const { filename } = data.data[0];
        responseUrl(req, res, filename);
      }
    }).catch(() => {
      responseError(res, 'We have encountered problems when accessing the video. Please try again.');
    });
  };
};

const recordVideo = (req, res, videos, videoInfo) => {
  videos.create(videoInfo).then(() => {
    responseUrl(req, res, videoInfo.filename);
  }).catch(() => {
    responseError(res, 'We have encountered problems when accessing the video. Please try again.');
  });
};

const responseUrl = (req, res, filename) => {
  res.status(200);
  res.json({
    url: `${req.protocol}://${req.get('host')}/assets/videos/${filename}`,
  });
};

const responseError = (res, error) => {
  res.status(404);
  res.statusMessage = error;
  res.send({
    message: error,
  });
};
