/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const getData = (speciesURL) => {
  return axios.get(speciesURL).then((response) => response).catch((error) => error);
};

function displayData(props) {
  console.log(getData('http://swapi.dev/api/species/2/'));

  console.log(props.swBulkData);
  let species;
  return props.swBulkData.map((stuff) => {
    if (stuff.species.length === 0) {
      species = 'Human';
    } else {
      getData();
    }
    return (
      <tr>
        <td>{stuff.name}</td>
        <td>{stuff.birth_year}</td>
        <td>{stuff.height}</td>
        <td>{stuff.mass}</td>
        <td>{stuff.homeworld}</td>
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
