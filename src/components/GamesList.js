import React, { useState } from "react";
import PouchDB from 'pouchdb';
import HousieGame from '../models/HousieGame';

function GameList() {
  const [gameDB] = useState(new PouchDB("games"));
  window.gameDB = gameDB;

  let gameList = [];

  gameDB.allDocs().then(function(result) {
    result.rows.forEach(function(row) {
      gameDB.get(row.id).then(function(game) {
        game = new HousieGame(row.id, game.name, game.drawn, new Date(game.createdAt));
        const newRow = (
          <li>
            <a href={`#${row.id}`} onClick={() => {window.load(row.id)}}>{game.name}</a>
            <span>{`(${game.createdAtReadable()})`}</span>
          </li>
        );

        gameList.append(newRow);
      });
    });
  });  

  return (
    <ul>
      {gameList}
    </ul>
  );
}

export default GameList;
