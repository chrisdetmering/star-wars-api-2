/* eslint-disable dot-notation */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import '../styles/App.css';

const getData = (setSwBulkData) => {
  axios.get('https://swapi.dev/api/people/?page=3').then((response) => {
    setSwBulkData(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
};

function App() {
  const [swBulkData, setSwBulkData] = useState({});

  useEffect(() => {
    getData(setSwBulkData);
  });

  return (
    <div className="App">
      <h1>Star Wars API</h1>
      <Table swBulkData={swBulkData} />
    </div>
  );
}

export default App;
