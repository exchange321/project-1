'use strict';
const fs = require('fs');
const path = require('path');
const youtubeDl = require('youtube-dl');

module.exports = function(app) {
  return function(req, res) {

    const { v: videoId, userId } = req.body;
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
            let videoInfo = {};
            video.on('info', (info) => {
              if (info.size > 20000000) {
                video.emit('error', {
                  message: 'The video is too long. Please try other videos.',
                });
              } else {
                videoInfo = {
                  title: info.title,
                  description: info.description,
                  thumbnail: info.thumbnail,
                };
                video.pipe(fs.createWriteStream(file));
              }
            });
            video.on('error', (err) => {
              error = true;
              responseError(res, err.message);
            });
            video.on('end', () => {
              if (!error) {
                recordVideo(app, req, res, videos, {
                  videoId,
                  filename,
                  title: videoInfo.title,
                  description: videoInfo.description,
                  thumbnail: videoInfo.thumbnail,
                }, userId, videoId);
              }
            });
          }
        });
      } else {
        const { filename } = data.data[0];
        responseUrl(app, req, res, filename, userId, videoId);
      }
    }).catch(() => {
      responseError(res, 'We have encountered problems when accessing the video. Please try again.');
    });
  };
};

const recordVideo = (app, req, res, videos, videoInfo, userId, videoId) => {
  videos.create(videoInfo).then(() => {
    responseUrl(app, req, res, videoInfo.filename, userId, videoId);
  }).catch(() => {
    responseError(res, 'We have encountered problems when recording the video. Please try again.');
  });
};

const responseUrl = (app, req, res, filename, userId, videoId) => {
  app.service('favorites').find({
    query: {
      userId,
      videoId,
    },
  }).then(({ total }) => {
    res.status(200);
    res.json({
      url: `${req.protocol}://${app.get('host')}:${app.get('port')}/assets/videos/${filename}`,
      favorite: total > 0,
    });
  }).catch(() => {
    responseError(res, 'We have encountered problems when reading favorites. Please try again.');
  });
};

const responseError = (res, error) => {
  res.status(404);
  res.statusMessage = error;
  res.send({
    message: error,
  });
};
