/**
 * Created by Wayuki on 25-Mar-17.
 */
/* eslint-disable react/jsx-filename-extension, react/no-array-index-key */

import React from 'react';
import { SEARCH_PAGE_ACTIONS } from './actionTypes';
import { search } from '../youtube';
import { getWordAt } from '../../../helpers';

const registerQueryResults = results => ({
  type: SEARCH_PAGE_ACTIONS.REGISTER_QUERY_RESULTS,
  results,
});

export const handleQueryChange = value => (
  (dispatch) => {
    let words = value.match(/[,.!?;: ]+|\b[a-zA-Z0-9']+\b|^[a-zA-Z0-9]+\b/g) || [];
    words = words.map((word, key) => {
      if (word.search(/[,. ]/) > -1) {
        return <span key={key} className="punct">{ word }</span>;
      }
      return <span key={key} className={`word-${key}`}>{ word }</span>;
    });
    dispatch({
      type: SEARCH_PAGE_ACTIONS.HANDLE_QUERY_CHANGE,
      value,
      words,
    });
  }
);

export const handleQuerySubmit = () => (
  (dispatch, getState) => new Promise((resolve, reject) => {
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

export const handleInputBoxFocus = caretPosition => (
  (dispatch, getState) => {
    const {
      query,
      inputbox: {
        caretPosition: oldCaretPosition,
      },
    } = getState().searchPage;
    if (oldCaretPosition !== caretPosition) {
      const word = getWordAt(query, caretPosition);
      console.log(word, window.$(`.${word.pos}`).text());
      dispatch({
        type: SEARCH_PAGE_ACTIONS.REGISTER_CARET_POSITION,
        caretPosition,
      });
    }
  }
);

export default () => {};
