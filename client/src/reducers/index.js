/**
 * Created by Wayuki on 24-Mar-17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import sidebar from './sidebarReducer';
import searchPage from './searchPageReducer';
import videoPage from './videoPageReducer';
import videoNotes from './videoNotesReducer';
import videoNote from './videoNoteReducer';
import favoritePage from './favoritePageReducer';

const rootReducer = combineReducers({
  auth,
  sidebar,
  searchPage,
  videoPage,
  videoNotes,
  videoNote,
  favoritePage,
  routing: routerReducer,
});

export default rootReducer;
