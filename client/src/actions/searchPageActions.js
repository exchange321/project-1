/**
 * Created by Wayuki on 25-Mar-17.
 */
/* eslint-disable react/jsx-filename-extension, react/no-array-index-key */

import React from 'react';
import getEmoji from 'emoji-from-word';
import { SEARCH_PAGE_ACTIONS } from './actionTypes';
import { search } from '../../../youtube';
import { getWordAt, getWordSuggestion, dissembleSentence } from '../../../helpers';

import app from '../feathers';

const registerQueryResults = results => ({
  type: SEARCH_PAGE_ACTIONS.REGISTER_QUERY_RESULTS,
  results,
});

export const handleQueryChange = value => (
  (dispatch) => {
    let words = dissembleSentence(value);
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
        app.service('searchHistories').create({
          query,
        }).catch();
        dispatch(registerQueryResults(results));
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }
  })
);

export const registerSpellingSuggestions = spelling => ({
  type: SEARCH_PAGE_ACTIONS.REGISTER_SPELLING_SUGGESTIONS,
  spelling,
});

export const registerCaretPosition = caretPosition => ({
  type: SEARCH_PAGE_ACTIONS.REGISTER_CARET_POSITION,
  caretPosition,
});

export const handleInputBoxFocus = caretPosition => (
  (dispatch, getState) => {
    const {
      query,
      inputbox: {
        caretPosition: oldCaretPosition,
      },
    } = getState().searchPage;
    if (oldCaretPosition !== caretPosition) {
      const { wordClass, wordPos, word } = getWordAt(query, caretPosition);
      if (word.search(/[,. ]/) < 0 && word.length > 0) {
        const spelling = getWordSuggestion(word);
        if (!spelling.found && spelling.suggestions.length > 0) {
          const suggestions = spelling.suggestions.map((suggestion) => {
            const { score, emoji } = getEmoji(suggestion.word);
            if(score >= 1) {
              suggestion.emoji = emoji.char;
            }
            return suggestion;
          });
          dispatch(registerSpellingSuggestions({
            show: true,
            wordPos,
            pos: window.$(`.${wordClass}`).position().left,
            suggestions: spelling.suggestions,
          }));
        } else {
          dispatch(registerSpellingSuggestions({
            show: false,
          }));
        }
      } else {
        dispatch(registerSpellingSuggestions({
          show: false,
        }));
      }
      dispatch(registerCaretPosition(caretPosition));
    }
  }
);

export const handleApplyingSuggestion = (wordPos, word) => (
  (dispatch, getState) => new Promise((resolve) => {
    const {
      query,
    } = getState().searchPage;
    const words = dissembleSentence(query);
    words[wordPos] = word;
    const left = words.slice(0, wordPos + 1).join('');
    const newCaretPosition = left.length;
    const right = words.slice(wordPos + 1).join('');
    const newWord = left + right;
    dispatch(handleQueryChange(newWord));
    dispatch(registerSpellingSuggestions({
      show: false,
    }));
    resolve(newCaretPosition);
  })
);

export default () => {};
