/**
 * Created by Wayuki on 25-Mar-17.
 */
import { SEARCH_PAGE_ACTIONS } from './actionTypes';

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
    const videos = ['Qoyvu9xFJQQ&t', 'WyAg0h7uxv8', '3EJC1edU3Y4', 'WC6Xx_jLXmg', 'Yo2-Pgcmh8U', 'uYaPF5wZNEo'];
    let results = [];
    if (query.length > 0) {
      results = videos.map(videoId => ({
        title: query,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi eaque harum ipsa magni obcaecati quam, quidem quos repudiandae voluptatum. Accusantium cumque debitis distinctio dolorum earum est facilis ipsum magnam molestias necessitatibus nemo nobis officia, quas quidem quos ratione veritatis voluptate. Consequuntur facilis laudantium odio sint veniam! Blanditiis, illum, quo!',
        videoId,
      }));
    }
    dispatch(registerQueryResults(results));
    resolve();
  })
);

export default () => {};
