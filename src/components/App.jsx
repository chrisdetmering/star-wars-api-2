/* eslint-disable dot-notation,arrow-body-style */
import React, { useEffect, useState } from 'react';
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

const getHomeworld = async (worldAPI) => {
  console.log('Hello from GetHomeworld', worldAPI);
  const world = await axios.get(worldAPI);
  return world.data.name;
};

const setHomeWorld = async (response) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const characterInfo of response) {
    // eslint-disable-next-line no-await-in-loop
    const world = await getHomeworld(characterInfo.homeworld);
    characterInfo.homeworld = (world);
  }
};

const getSpecies = async (speciesAPI) => {
  console.log('Hello from GetSpecies', speciesAPI);
  const species = await axios.get(speciesAPI);
  return species.data.name;
};

const setSpecies = async (response) => {
  let species;
  // eslint-disable-next-line no-restricted-syntax
  for (const characterInfo of response) {
    // eslint-disable-next-line no-await-in-loop
    if (characterInfo.species.length === 0) {
      characterInfo.species = 'Human';
    } else {
      // eslint-disable-next-line no-await-in-loop
      species = await getSpecies(characterInfo.species[0]);
      characterInfo.species = (species);
    }
  }
};

function App() {
  const [swBulkData, setSwBulkData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResponse();
      const CharacterInfo = response.data.results;
      await setHomeWorld(CharacterInfo);
      await setSpecies(CharacterInfo);
      setSwBulkData(CharacterInfo);
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
