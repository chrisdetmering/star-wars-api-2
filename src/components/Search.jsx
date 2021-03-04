import React, { useState } from 'react';

function Search(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.search(); 
  };
 
  return (
    <div id="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          className="form-control search" 
          type="search" 
          placeholder="Name Search" 
          aria-label="Search" 
          value={props.value} 
          onChange={props.change} />
        {/* eslint-disable-next-line react/button-has-type */}
        <button 
          className="btn btn-dark submit" 
          type="submit" 
          value="Search">Search</button>
      </form>
    </div>
  );
}

export default Search;
