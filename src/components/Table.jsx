/* eslint-disable arrow-body-style */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/table.css';

function displayData(props) {
  return props.swCharacterInfo.map((characterInfo) => {
    return (
      <tr>
        <td>{characterInfo.name}</td>
        <td>{characterInfo.birth_year}</td>
        <td>{characterInfo.height}</td>
        <td>{characterInfo.mass}</td>
        <td>{characterInfo.homeworld}</td>
        <td>{characterInfo.species}</td>
      </tr>
    );
  });
}

function Table(props) {
  return (
    <div>
      <table id="data-table" className="table">
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
            props.swCharacterInfo[0]
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            && displayData(props)
          }
        </tbody>
      </table>

    </div>
  );
}

export default Table;
