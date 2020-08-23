import React from 'react';
import './Search.css';

function Search() {
  const rederict_uri = 'http;//localhost:3000/callback';
  const scopes = 'user-read-private user-read-email';

  return (
    <div className="Search">
      <input type="search" id="site-search" name="q" aria-label="Search on Spotify" placeholder="Search on Spotify..."></input>
      <button className="Search-button">Search</button>
    </div>
  );
}

export default Search;
