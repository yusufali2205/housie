import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import PouchDB from 'pouchdb';
// import HousieGame from '../models/HousieGame';
import GameList from './GamesList';

const propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

function GameForm({ onFormSubmit }) {
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    // var hash = window.location.hash.substring(1);
    // if(hash.length > 0) {
    //   window.load(hash);
    // }

    // $("#delete-all-games").on("click", (e) => {
    //    e.preventDefault();
    //    if(!confirm("WARNING!!! \nAre you sure? This action is irreversible.")) return;
    //    window.gameDB.destroy(() => window.location.reload());
    // });
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setGameName(value);
  }

  // const render = (game) => {
  //   $("#game-name").text(game.name);
  //   var drawSequence = $("#draw-sequence");
  //   drawSequence.html("");
  //   game.drawn.forEach(function(num) {
  //     $("#num-" + num).addClass("drawn").removeClass("last-drawn");
  //     var historyElement = $("<span>");
  //     historyElement.text(num + ", ");
  //     drawSequence.append(historyElement);
  //   });
  //   $("#num-" + game.drawn[game.drawn.length - 1]).addClass("last-drawn")
  // }

  // const showGameWindow = () => {
  //   document.getElementById("create-new-game-widget").className = "hidden"
  //   document.getElementById("game-window").className = ""
  // }

  // const load = (id) => {
  //   window.gameDB.allDocs().then(function(result) {
  //     var gameDoc = result.rows.find((game) => id == game.id)

  //     if(!gameDoc) return alert("NOT FOUND!");
  //     window.gameDB.get(gameDoc.id).then(function(game) {
  //       window.GAME = new HousieGame(gameDoc.id, game.name, game.drawn);
  //       render(window.GAME);
  //       showGameWindow();
  //     }).catch(() => {
  //       alert("Game not found!")
  //       window.location.hash = "";
  //     });
  //   });
  // }

  // const createNewGame = () => {
  //   try {
  //     var game = new HousieGame(null, gameName);
  //     window.GAME = game;
  //     window.gameDB.put(game.toJSON());
  //     render(game);
  //     showGameWindow();
  //   } catch(e) {
  //     alert("There was some error!!");
  //     throw e;
  //   }
  //   return false;
  // }

  // TODO: add button, render Board on submit, store in DB
  return (
    <React.Fragment>
      <Form inline>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="gameNameInput"
          placeholder="Enter game name"
          required={true}
          value={gameName}
          onChange={handleChange}
        />

        <Button
          className="mb-2"
          onClick={() => onFormSubmit(gameName)}
        >
          Create New Game
        </Button>
      </Form>

      <GameList />
    </React.Fragment>
  );
}

GameForm.propTypes = propTypes;

export default GameForm;
