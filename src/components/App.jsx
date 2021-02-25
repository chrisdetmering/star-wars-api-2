/* eslint-disable dot-notation,arrow-body-style */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Search from './Search';
import Pagination from './Pagination';
import '../styles/app.css';

const apiToHTTPS = (api) => {
  return api.replace('http', 'https'); 
};

const getCharacterInfo = async (swAPI) => {
  let response;
  try {
    response = await axios.get(swAPI);
  } catch (error) {
    console.log(error);
  }
  return {
    characterCount: response.data.count,
    characterInfo: response.data.results,
  };
};

const getHomeworld = async (worldAPI) => {
  console.log(worldAPI); 
  const world = await axios.get(worldAPI);
  return world.data.name;
};

const setHomeWorld = async (characters) => {
  const promises = characters.map((character) => {
    // eslint-disable-next-line no-param-reassign
    character.homeworld = apiToHTTPS(character.homeworld);
    console.log(character.homeworld);
    return getHomeworld(character.homeworld).then((world) => {
      // eslint-disable-next-line no-param-reassign
      character.homeworld = world;
    });
  });

  await Promise.all(promises);
};

const getSpecies = async (speciesAPI) => {
    console.log(speciesAPI); 
  const species = await axios.get(speciesAPI);
  return species.data.name;
};

const setSpecies = async (characters) => {
  const promises = characters.map((character) => {
    if (character.species.length === 0) {
      // eslint-disable-next-line no-param-reassign
      character.species = 'Human';
      return character.species;
    }
    // eslint-disable-next-line no-param-reassign
    character.species[0] = apiToHTTPS(character.species[0]);
    return getSpecies(character.species[0]).then((species) => {
      // eslint-disable-next-line no-param-reassign
      character.species = species;
    });
  });
  await Promise.all(promises);
};

const setAPI = (setswAPI, API) => {
  setswAPI(API);
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
