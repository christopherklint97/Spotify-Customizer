import React from 'react';
import './Search.css';

function Search() {

  return (
    <div className="Search">
      <input type="search" id="site-search" name="q" aria-label="Search on Spotify" placeholder="Search on Spotify..."></input>
      <button className="Search-button">Search</button>
    </div>
  );
}

export default Search;
