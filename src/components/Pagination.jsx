/* eslint-disable react/button-has-type */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const handleClick = (e, props) => {
  const { id } = e.target;
  props.setAPI(props.setswAPI, `https://swapi.dev/api/people/?page=${id}`);
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
    buttonArr.push(<button id={buttonCount} className="button" onClick={(event) => handleClick(event, props)}>{buttonCount}</button>);
    buttonCount += 1;
  }
  return buttonArr;
}

function Pagination(props) {
  return (
    <div>
      {generateButton(props)}
    </div>
  );
}

export default Pagination;
