/**
 * Created by Wayuki on 02-Apr-17.
 */
import toastr from 'toastr';
import { routerActions } from 'react-router-redux';

import { VIDEO_PAGE_ACTIONS } from './actionTypes';

export const registerVideo = videoId => (
  (dispatch) => {
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
          videoId,
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
