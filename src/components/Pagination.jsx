/* eslint-disable react/button-has-type */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/pagination.css';

const getAPI = (api, split) => {
  if (api.includes(split)) {
    const index = api.indexOf(split);
    return api.slice(0, index);
  }
  return api;
};

const handleClick = (event, props) => {
  const { id } = event.target;

  let apiStart = '';

  if (props.swAPI.includes('search')) {
    apiStart = getAPI(props.swAPI, '&');
  } else {
    apiStart = 'https://swapi.dev/api/people/';
  }

  const endAPI = props.swAPI.includes('search') ? `&page=${id}` : `?page=${id}`;
  props.setAPI(props.setswAPI, `${apiStart}${endAPI}`);
};

function getNumberOfButtons(props) {
  let mainNumber = props.swCharacterCount / 10;
  mainNumber += (props.swCharacterCount % 10 === 0) ? 0 : 1;

  return mainNumber;
}

function generateButton(props) {
  const buttonArr = [];
  let buttonCount = 1;
  while (buttonCount <= getNumberOfButtons(props)) {
    buttonArr.push(<button id={buttonCount} className="btn btn-dark" onClick={(event) => handleClick(event, props)}>{buttonCount}</button>);
    buttonCount += 1;
  }
  return buttonArr;
}

function Pagination(props) {
  return (
    <div id="pagination-container">
      {generateButton(props)}
    </div>
  );
}

export default Pagination;
