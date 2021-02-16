/* eslint-disable dot-notation */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import '../styles/App.css';

// function getData() {
//
// }

function App() {
  const [person, setPerson] = useState({});

  const getData = () => {
    axios.get('https://swapi.dev/api/people/?page=3').then((response) => {
    // console.log(response);
      setPerson(response.data.results);
    //   console.log(person);
    // }).catch(() => {
    //   console.log('Nope');
    });
    // setPerson(data);
  };

  useEffect(() => {
    getData();
    console.log(person[0]);
  });

  return (
    <div className="App">
      <h1>Star Wars API</h1>
      <Table person={person} />
    </div>
  );
}

export default App;
