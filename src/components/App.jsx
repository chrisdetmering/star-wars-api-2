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

const getSpecies = async (speciesURL) => {
  if (speciesURL.length === 0) { 
    return 'Human'; 
  } else { 
    const species = await axios.get(httpToHttps(speciesURL[0]));
    return species.data.name;
  }
};

function App() {
  const [characters, setCharacters] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getCharacters('https://swapi.dev/api/people/'); 
  }, []);


  async function getCharacters(url) { 
    const responseData = await getCharacterInfo(url);
      const { characterCount, characterInfo } = responseData;

      const characters = await Promise.all(characterInfo.map(async (character) => { 
        character.homeworld = await getHomeworld(character.homeworld); 
        character.species = await getSpecies(character.species)
        return character
      }))
  
      setCharacters(characters);
      setCharacterCount(characterCount);
  }

  function handleSearchTermChange(event) { 
    setSearchTerm(event.target.value.trim());
  }


  function handleSearchButtonClick(event) { 
    event.preventDefault(); 
    getCharacters(`https://swapi.dev/api/people/?search=${searchTerm}`)
  }

  function handlePageButtonClick(event) { 
      const pageNumber = event.target.id; 
    if (searchTerm === '') { 
      getCharacters(`https://swapi.dev/api/people/?page=${pageNumber}`); 
    } else { 
      getCharacters(`https://swapi.dev/api/people/?search=${searchTerm}&page=${pageNumber}`); 
    }
  }

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
              <Search 
                search={handleSearchButtonClick} 
                change={handleSearchTermChange}
                value={searchTerm}
                />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Table characters={characters} />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Pagination
                characterCount={characterCount}
                click={handlePageButtonClick}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
