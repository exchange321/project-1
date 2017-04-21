/**
 * Created by Wayuki on 24-Mar-17.
 */
export default {
  sidebar: {
    open: false,
  },
  auth: {
    user: {},
    login: false,
  },
  searchPage: {
    query: '',
    words: [],
    results: [],
    spelling: {
      show: false,
      wordPos: 0,
      pos: 0,
      suggestions: [],
    },
    inputbox: {
      caretPosition: -1,
    },
  },
  videoPage: {
    videoId: '',
    src: '',
    isVideoLoaded: false,
    isOnPage: false,
    favorite: false,
    video: {
      title: '',
      description: '',
    },
  },
  videoNotes: {
    notes: [],
  },
  videoNote: {
    show: false,
    newNote: false,
    id: '',
    time: 0,
    imgUrl: '',
    title: '',
    note: '',
    errors: {},
  },
};
