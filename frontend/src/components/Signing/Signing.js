import React, {useState, useEffect} from 'react';
import ContractDropdowns from "./ContractDropdowns";
import MappedPlayers from "./MappedPlayers";
import axios from "axios";

function Signing() {

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

  return (
    <div>
    <p>
    <MappedPlayers/>
        {
        player.map(player =>
        <p>
                <ContractDropdowns/>
        </p>)
        }
    </p>

      </div>
  );
}

export default Signing