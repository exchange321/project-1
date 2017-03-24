/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';

import SearchResult from './SearchResult.jsx';

const SearchResults = () => (
  <div className="search-result-container frame clearfix">
    { Array.apply(0, new Array(5)).map((key, index) => (
      <SearchResult key={index} />
    )) }
  </div>
);

export default SearchResults;
