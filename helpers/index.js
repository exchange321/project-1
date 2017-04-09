/**
 * Created by Wayuki on 26-Mar-17.
 */
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
    const previousSentense = str.slice(0, lastWordPos);
    const previousWords = previousSentense.match(/[,.!?;: ]+|\b[a-zA-Z0-9']+\b|^[a-zA-Z0-9]+\b/g);
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
    pos: `word-${numWordsBefore + 1}`,
    word,
  }

};