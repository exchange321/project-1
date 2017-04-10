/**
 * Created by Wayuki on 02-Apr-17.
 */
import toastr from 'toastr';
import { routerActions } from 'react-router-redux';
import { getInfo } from '../../../youtube';

import { VIDEO_PAGE_ACTIONS } from './actionTypes';

export const pageEntered = () => ({
  type: VIDEO_PAGE_ACTIONS.PAGE_ENTERED,
});

export const registerVideo = videoId => (
  (dispatch) => {
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
    fetch(restLink).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw new Error(response.statusText);
    })
      .then(response => (
        response.json()
      ))
      .then(({ url }) => {
        dispatch({
          type: VIDEO_PAGE_ACTIONS.REGISTER_VIDEO,
          src: url,
        });
      })
      .catch((err) => {
        toastr.error(err.message);
        dispatch(routerActions.replace('/'));
      });
  }
);

export const resetVideoPage = () => ({
  type: VIDEO_PAGE_ACTIONS.RESET_VIDEO_PAGE,
});

export default () => {};
