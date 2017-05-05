/**
 * Created by Wayuki on 24-Mar-17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as idle } from '../idle-monitor';

import auth from './authReducer';
import appPage from './appPageReducer';
import sidebar from './sidebarReducer';
import searchPage from './searchPageReducer';
import videoPage from './videoPageReducer';
import videoNotes from './videoNotesReducer';
import videoNote from './videoNoteReducer';
import favoritePage from './favoritePageReducer';
import historyPage from './historyPageReducer';

const rootReducer = combineReducers({
  idle,
  auth,
  appPage,
  sidebar,
  searchPage,
  videoPage,
  videoNotes,
  videoNote,
  favoritePage,
  historyPage,
  routing: routerReducer,
});

export default rootReducer;
