/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const getData = async (speciesURL) => {
  let data;
  try {
    data = await axios.get(speciesURL);
  } catch (error) {
    console.log('Error: ', error);
  }
  console.log(data);
  return data;
};

function displayData(props) {
  console.log(props.swBulkData);
  let species;
  return props.swBulkData.map((characterInfo) => {
    if (characterInfo.species.length === 0) {
      species = 'Human';
    } else {
      const { data } = getData(characterInfo.species);
      species = data.name;
    }
    return (
      <tr>
        <td>{characterInfo.name}</td>
        <td>{characterInfo.birth_year}</td>
        <td>{characterInfo.height}</td>
        <td>{characterInfo.mass}</td>
        <td>{characterInfo.homeworld}</td>
        <td>{species}</td>
      </tr>
    );
  });
}

function Table(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Home World</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            props.swBulkData[0]
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            && displayData(props)
          }
        </tbody>
      </table>

    </div>
  );
}

export default Table;
