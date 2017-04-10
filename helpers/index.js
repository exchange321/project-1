/**
 * Created by Wayuki on 26-Mar-17.
 */
import Spelling from 'spelling';
import dictionary from 'spelling/dictionaries/en_US';

const dict = new Spelling(dictionary);

export const getCookieData = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

export const getWordAt = (str, pos) => {

  str = String(str);
  pos = Number(pos) >>> 0;

  let numWordsBefore = -1;
  const lastWordPos = str.slice(0, pos + 1).search(/[,. ]+[0-9a-zA-Z]*$/);
  if (lastWordPos > -1) {
    const previousSentence = str.slice(0, lastWordPos);
    const previousWords = dissembleSentence(previousSentence);
    numWordsBefore = previousWords.length;
  }

  const left = str.slice(0, pos + 1).search(/[0-9a-zA-Z]+$/);
  const right = str.slice(pos).search(/[,. ]+/);

  let word = "";
  if (right < 0) {
    word = str.slice(left);
  } else {
    word = str.slice(left, right + pos);
  }

  return {
    wordPos: numWordsBefore + 1,
    wordClass: `word-${numWordsBefore + 1}`,
    word,
  }

};

export const dissembleSentence = sentence => sentence.match(/[,.!?;: ]+|\b[a-zA-Z0-9']+\b|^[a-zA-Z0-9]+\b/g) || [];

export const getWordSuggestion = word => dict.lookup(word);

const setSelectionRange = (input, selectionStart, selectionEnd) => {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
};

export const setCaretToPos = (input, pos) => {
  setSelectionRange(input, pos, pos);
};

export const checkOverflown = element => (
  element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
);