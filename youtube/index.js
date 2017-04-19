/**
 * Created by Wayuki on 08-Apr-17.
 */
import withQuery from 'with-query';
import API_KEY from '../secret';

const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
const getInfoUrl = 'https://www.googleapis.com/youtube/v3/videos';

const baseParams = {
  key: API_KEY,
};

const searchParams = query => ({
  ...baseParams,
  maxResults: 25,
  part: 'snippet',
  q: query,
  type: 'video',
  videoDuration: 'short',
  videoEmbeddable: 'true',
  videoSyndicated: 'true',
});

const getInfoParams = videoId => ({
  ...baseParams,
  part: 'snippet',
  id: videoId,
});

export const search = query => (
  new Promise((resolve, reject) => {
    fetch(withQuery(searchUrl, searchParams(query)))
      .then(res => res.json())
      .then((results) => {
        resolve(results.items);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

export const getInfo = videoId => (
  new Promise((resolve, reject) => {
    fetch(withQuery(getInfoUrl, getInfoParams(videoId)))
      .then(res => res.json())
      .then((results) => {
        resolve(results.items[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

export default () => {};
