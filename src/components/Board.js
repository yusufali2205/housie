import React, { useState } from "react";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

// import HousieGame from '../models/HousieGame';

const propTypes = {
  name: PropTypes.string.isRequired,
}

function Board({ name }) {
  const [currentNumber, setCurrentNumber] = useState(0);

  const draw = () => {
    setCurrentNumber(Math.random());
  };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setGameName(value);
  // }

  // const randomId = () => {
  //   return (Math.random() * Math.pow(10,16)).toString(36);
  // }

  return (
    <React.Fragment>
      <div>This is game board, {name}. Current number {currentNumber}</div>
      <Button variant="primary" onClick={draw}>
        Draw
      </Button>
    </React.Fragment>
  );
}

Board.propTypes = propTypes;

export default Board;
