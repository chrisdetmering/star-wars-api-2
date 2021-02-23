/* eslint-disable dot-notation,arrow-body-style */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Search from './Search';
import Pagination from './Pagination';

const getCharacterInfo = async (swAPI) => {
  let response;
  try {
    response = await axios.get(swAPI);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  return {
    characterCount: response.data.count,
    characterInfo: response.data.results,
  };
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

const setAPI = (setswAPI, API) => {
  setswAPI(API);
  // console.log(swAPI);
};

function App() {
  const [swCharacterInfo, setswCharacterInfo] = useState({});
  const [swCharacterCount, setswCharacterCount] = useState(0);
  const [swAPI, setswAPI] = useState('https://swapi.dev/api/people/');

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getCharacterInfo(swAPI);
      const { characterCount, characterInfo } = responseData;
      await setHomeWorld(characterInfo);
      await setSpecies(characterInfo);
      setswCharacterInfo(characterInfo);
      setswCharacterCount(characterCount);
    };
    fetchData();
  }, [swAPI]);

  return (
    <div className="app">
      <main>
        <Search setswAPI={setswAPI} setAPI={setAPI} />
        <h1>Star Wars API</h1>
        <Table swCharacterInfo={swCharacterInfo} />
      </main>
      <Pagination
        swCharacterCount={swCharacterCount}
        swAPI={swAPI}
        setswAPI={setswAPI}
        setAPI={setAPI}
      />
    </div>
  );
}

export default App;
