import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function Draft() {
  return <DataFetching />;
}

function DataFetching() {
  const[player, setPlayer] = useState([]);
  const[selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/playergeneration/')
        .then(res => {
          console.log(res)
          setPlayer(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, []);

  let dropdown = player.map(player => (
    <option key={player.id} value={player.value}>
        {player.name}
    </option>
  ));

  function draftPlayer () {
      console.log({selected})
  }

  return (
      <div>
        <p>
          {
            player.map(player =>
                <p key={player.id}>
                    Name: {player.name} &nbsp; Suit: {player.suit} &nbsp; Age: {player.age} &nbsp; EPV: {player.epv}
                </p>)
          }
        </p>
        <select onChange={e => setSelected(e.currentTarget.value)}>
        <option>Select Player</option>
                {dropdown}
        </select>
      <h3>Drafting {selected}</h3>
       <button onClick={draftPlayer}> Draft</button>
      </div>
  )
}