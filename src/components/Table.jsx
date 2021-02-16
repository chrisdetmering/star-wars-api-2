import React from 'react';

function Table(props) {
  return (
    <div>
      {
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        props.person[0]
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        && <p>{props.person[0].name}</p>
      }
    </div>
  );
}

export default Table;
