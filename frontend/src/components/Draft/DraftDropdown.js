import React, {useEffect, useState} from 'react';
import useInputState from './useInputState';
import axios from "axios";

const DraftDropdown = ({ saveDrafted }) => {
  const { value, reset, onChange } = useInputState();

  const[player, setPlayer] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/players/')
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

  return (
    <div>
      <h3>Drafting {value}</h3>
        <select onChange={onChange}>
        <option>Select Player</option>
                {dropdown}
        </select>
        <p></p>
       <button onClick={event => {
        event.preventDefault();

        saveDrafted(value);
        reset();
      }}> Draft</button>
    </div>
  );
};

export default DraftDropdown;