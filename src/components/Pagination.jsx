import React from 'react';
import { v4 as uuidv4 } from 'uuid';



function getNumberOfButtons(props) {
  return Math.ceil(props.characterCount / 10);
}

function creatButtons(props) {
  const buttons = [];
  let buttonCount = 1;
  const numButtons = getNumberOfButtons(props); 
  
  while (buttonCount <= numButtons) {
    console.log(buttonCount); 
    buttons.push(
    <button 
      key={uuidv4()} 
      id={buttonCount} 
      className="btn btn-dark btn-lg pagination" 
      onClick={props.click}>{buttonCount}</button>);
    buttonCount += 1;
  }
  return buttons;
}

function Pagination(props) {
  return (
    <div id="pagination-container" className="row">
      {creatButtons(props)}
    </div>
  );
}

export default Pagination;
