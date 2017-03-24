/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';

import SearchBar from './searchBar/index.jsx';
import SearchResults from './searchResults/index.jsx';

const SearchPage = () => (
  <div className="container search">
    <SearchBar />
    <SearchResults />
  </div>
);

export default SearchPage;
