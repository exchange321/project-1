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
    const results = [];
    if (value.length > 0) {
      for (let i = 0; i < 5; i += 1) {
        results[i] = {
          title: value,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi eaque harum ipsa magni obcaecati quam, quidem quos repudiandae voluptatum. Accusantium cumque debitis distinctio dolorum earum est facilis ipsum magnam molestias necessitatibus nemo nobis officia, quas quidem quos ratione veritatis voluptate. Consequuntur facilis laudantium odio sint veniam! Blanditiis, illum, quo!',
        };
      }
    }
    dispatch(registerQueryResults(results));
    dispatch({
      type: SEARCH_PAGE_ACTIONS.HANDLE_QUERY_CHANGE,
      value,
    });
  }
);

export default () => {};