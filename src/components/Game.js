import React, { useState } from "react";

import Button from 'react-bootstrap/Button';

import Form from './Form';
import GameList from './GamesList';
import Board from './Board';

function Game() {
  const [selectedGame, setSelectedGame] = useState(null);

  const onBackButtonClick = () => {
    setSelectedGame(null);
  };

  const onFormSubmit = (gameName) => {
    setSelectedGame(gameName);
  };

  const backButton = <Button variant="secondary" onClick={onBackButtonClick}>Back</Button>;

  let currentView;

  if (selectedGame) {
    // board with selected game and back button
    currentView =  (
      <React.Fragment>
        {backButton}
        <Board name={selectedGame} />
      </React.Fragment>
    );
  } else {
    currentView = (
      <React.Fragment>
        <Form onFormSubmit={onFormSubmit} />
        <GameList />
      </React.Fragment>
    )
  }

  return (
    <div style={{ margin: '20px' }}>
      {currentView}
    </div>
  );
}

export default Game;
