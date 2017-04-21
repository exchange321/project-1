/**
 * Created by Wayuki on 02-Apr-17.
 */
import toastr from 'toastr';
import { routerActions } from 'react-router-redux';
import { getInfo } from '../../../youtube';
import app from '../feathers';

import { VIDEO_PAGE_ACTIONS } from './actionTypes';

export const pageEntered = () => ({
  type: VIDEO_PAGE_ACTIONS.PAGE_ENTERED,
});

export const registerVideo = videoId => (
  (dispatch, getState) => {
    getInfo(videoId).then((item) => {
      dispatch({
        type: VIDEO_PAGE_ACTIONS.REGISTER_VIDEO_INFO,
        videoId,
        video: {
          title: item.snippet.title,
          description: item.snippet.description,
        },
      });
    }).catch((err) => {
      toastr.error(err.message);
      dispatch(routerActions.replace('/'));
    });

    const restLink = `${window.location.protocol}//${window.location.hostname}${window.location.port.length > 0 ? `:${window.location.port}` : ''}/video?v=${videoId}`;
    fetch(restLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        v: videoId,
        userId: getState().auth.user._id,
      }),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw new Error(response.statusText);
    }).then(response => (
      response.json()
    ))
    .then(({ url, favorite }) => {
      dispatch({
        type: VIDEO_PAGE_ACTIONS.REGISTER_VIDEO,
        src: url,
      });
      dispatch({
        type: VIDEO_PAGE_ACTIONS.SET_FAVORITE_STATE,
        favorite,
      });
    })
    .catch((err) => {
      toastr.error(err.message);
      dispatch(routerActions.replace('/'));
    });
  }
);

export const handleFavoriteButtonClick = () => (
  (dispatch, getState) => {
    const {
      videoPage: {
        favorite,
        videoId,
      },
      auth: {
        user: {
          _id : userId,
        },
      },
    } = getState();
    if (favorite) {
      app.service('favorites').remove(null, {
        videoId,
        userId,
      }).then(() => {
        dispatch(setFavoriteState(false));
        toastr.success('Video has been removed from favorite list.');
      }).catch((err) => {
        toastr.error(err.message);
      });
    } else {
      app.service('favorites').find({
        query: {
          videoId,
          userId,
        },
      }).then(({ total }) => {
        if (total < 1) {
          return app.service('favorites').create({
            videoId,
            userId,
          });
        }
      }).then(() => {
        dispatch(setFavoriteState(true));
        toastr.success('Video has been added to favorite list.');
      }).catch((err) => {
        toastr.error(err.message);
      });
    }
  }
);

export const setFavoriteState = favorite => ({
  type: VIDEO_PAGE_ACTIONS.SET_FAVORITE_STATE,
  favorite,
});

export const resetVideoPage = () => ({
  type: VIDEO_PAGE_ACTIONS.RESET_VIDEO_PAGE,
});

export default () => {};
