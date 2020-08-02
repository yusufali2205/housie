import React, { useState } from "react";
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

  const backButton = <button onClick={onBackButtonClick}>Back</button>;

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
    <React.Fragment>
      {currentView}
    </React.Fragment>
  );
}

export default Game;
