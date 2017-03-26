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