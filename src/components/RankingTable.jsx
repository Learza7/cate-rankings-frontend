import React, { useState, useEffect } from "react";
import "./RankingTable.css";
function RankingTable() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/players")
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <>
      <table className="">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Classical</th>
            <th scope="col">Rapid</th>
            <th scope="col">Blitz</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.fideId}>
              <td>{`${player.lastName} ${player.firstName}`}</td>
              <td>{player.lastElo.classical}</td>
              <td>{player.lastElo.rapid}</td>
              <td>{player.lastElo.blitz}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RankingTable;