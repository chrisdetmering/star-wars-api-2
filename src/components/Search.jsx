import React, { useState } from 'react';

const handleChange = (event, setSearch) => {
  console.log(event.target.value);
  setSearch(event.target.value.trim());
};

const handleSubmit = (event, props, search) => {
  event.preventDefault();
  console.log(search);
  const api = search.length > 0 ? `https://swapi.dev/api/people/?search=${search}` : 'https://swapi.dev/api/people/';
  props.setAPI(props.setswAPI, api);
};

function Search(props) {
  const [search, setSearch] = useState('');
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, props, search)}>
        <input type="text" name="search" value={search} onChange={(event) => handleChange(event, setSearch)} />
        {/* eslint-disable-next-line react/button-has-type */}
        <button type="submit" value="Search">Search</button>
      </form>
    </div>
  );
}

export default Search;
