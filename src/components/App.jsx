import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Search from './Search';
import Pagination from './Pagination';

const httpToHttps = (url) => {
  return url.replace('http', 'https');
};

const getCharacterInfo = async (swURL) => {
  let response;
  try {
    response = await axios.get(swURL);
  } catch (error) {
    console.log(error);
  }
  return {
    characterCount: response.data.count,
    characterInfo: response.data.results,
  };
};

const getHomeworld = async (worldURL) => {
  const world = await axios.get(httpToHttps(worldURL));
  return world.data.name;
};

const setHomeWorld = async (characters) => {
  const promises = characters.map((character) => {
    return getHomeworld(character.homeworld).then((world) => {
      character.homeworld = world;
    });
  });

  await Promise.all(promises);
};

const getSpecies = async (speciesAPI) => {
  const species = await axios.get(httpToHttps(speciesAPI));
  return species.data.name;
};

const setSpecies = async (characters) => {
  const promises = characters.map((character) => {
    if (character.species.length === 0) {
      character.species = 'Human';
      return character.species;
    }
    return getSpecies(character.species[0]).then((species) => {
      character.species = species;
    });
  });
  await Promise.all(promises);
};

const setURL = (setswURL, URL) => {
  setswURL(URL);
};

function App() {
  const [swCharacterInfo, setswCharacterInfo] = useState({});
  const [swCharacterCount, setswCharacterCount] = useState(0);
  const [swURL, setswURL] = useState('https://swapi.dev/api/people/');

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getCharacterInfo(swURL);
      const { characterCount, characterInfo } = responseData;
      await setHomeWorld(characterInfo);
      await setSpecies(characterInfo);
      setswCharacterInfo(characterInfo);
      setswCharacterCount(characterCount);
    };
    fetchData();
  }, [swURL]);

  return (
    <div className="container app">
      <div id="main-page-container">
        <main>
          <div className="row">
            <div className="col-12">
              <h1 id="hero-title">Star Wars Data</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Search setswURL={setswURL} setURL={setURL} />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Table swCharacterInfo={swCharacterInfo} />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Pagination
                swCharacterCount={swCharacterCount}
                swURL={swURL}
                setswURL={setswURL}
                setAPI={setURL}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
