/**
 * Created by Wayuki on 24-Mar-17.
 */
import React from 'react';

const SearchResult = () => (
  <div className="search-result p-4 clearfix">
    <div className="row">
      <div className="thumbnail col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-3" />
      <div className="result-info col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
        <div className="result-title">
          <h2>I am Title</h2>
        </div>
        <div className="result-desc">
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi eaque harum ipsa magni obcaecati quam, quidem quos repudiandae voluptatum. Accusantium cumque debitis distinctio dolorum earum est facilis ipsum magnam molestias necessitatibus nemo nobis officia, quas quidem quos ratione veritatis voluptate. Consequuntur facilis laudantium odio sint veniam! Blanditiis, illum, quo!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SearchResult;
