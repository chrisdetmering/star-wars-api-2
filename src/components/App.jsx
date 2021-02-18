/* eslint-disable dot-notation */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import '../styles/App.css';

const getResponse = async () => {
  let response;
  try {
    response = await axios.get('https://swapi.dev/api/people/?page=3');
  } catch (error) {
    console.log(error);
  }
  return response;
};

function App() {
  const [swBulkData, setSwBulkData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResponse();
      setSwBulkData(response.data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Star Wars API</h1>
      <Table swBulkData={swBulkData} />
    </div>
  );
}

export default App;
