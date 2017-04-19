/**
 * Created by Wayuki on 4/19/2017.
 */

const validate = (title, note) => {
  return new Promise((resolve, reject) => {
    let hasError = false;
    const errors = {};
    if (title.trim().length < 1) {
      hasError = true;
      errors.title = 'Title cannot be blank. Please try again.';
    }
    if (note.trim().length < 1) {
      hasError = true;
      errors.note = 'Note cannot be blank. Please try again.';
    }
    if (hasError) {
      reject(errors);
    } else {
      resolve();
    }
  });
};

module.exports = validate;
