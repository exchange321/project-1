/**
 * Created by Wayuki on 25-Mar-17.
 */
import withQuery from 'with-query';
import { SEARCH_PAGE_ACTIONS } from './actionTypes';
import { search } from '../youtube';

const registerQueryResults = results => ({
  type: SEARCH_PAGE_ACTIONS.REGISTER_QUERY_RESULTS,
  results,
});

export const handleQueryChange = value => (
  (dispatch) => {
    dispatch({
      type: SEARCH_PAGE_ACTIONS.HANDLE_QUERY_CHANGE,
      value,
    });
  }
);

export const handleQuerySubmit = () => (
  (dispatch, getState) => new Promise((resolve) => {
    const { query } = getState().searchPage;
    if (query.length > 0) {
      search(query).then((results) => {
        dispatch(registerQueryResults(results));
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }
  })
);

export default () => {};
