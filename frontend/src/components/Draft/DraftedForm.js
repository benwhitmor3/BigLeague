import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';
import axios from "axios";

const DraftedForm = ({ saveDrafted }) => {
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

function draftPlayer () {
  console.log({value})
}

  return (
    <div>
    {/*  <form*/}
    {/*  onSubmit={event => {*/}
    {/*    event.preventDefault();*/}

    {/*    saveDrafted(value);*/}
    {/*    reset();*/}
    {/*  }}*/}
    {/*>*/}
    {/*  <TextField*/}
    {/*    variant="outlined"*/}
    {/*    placeholder="Add Player"*/}
    {/*    margin="normal"*/}
    {/*    onChange={onChange}*/}
    {/*    value={value}*/}
    {/*  />*/}
    {/*</form>*/}
          <select onChange={onChange}>
        <option>Select Player</option>
                {dropdown}
        </select>
       <button onClick={event => {
        event.preventDefault();

        saveDrafted(value);
        reset();
      }}> Draft</button>
    </div>
  );
};

export default DraftedForm;