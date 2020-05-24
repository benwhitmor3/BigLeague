import React, {useEffect, useState} from "react";
import axios from "axios";
import FreeAgentContractDropdowns from "../Dropdowns/FreeAgentContractDropdowns";

function SigningFreeAgents() {
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
          {
            player.map(player =>
                <p key={player.name}>
                    <div style={{ fontWeight: 'bold' }}>
                    Name: {player.name} &nbsp;
                    Suit: {player.suit} &nbsp;
                    Age: {player.age} &nbsp;
                    EPV: {player.epv}
                    </div>
                    <FreeAgentContractDropdowns name={player.name} epv={player.epv} age={player.age}/>
                </p>)
          }
        </p>
      </div>
  )
}

export default SigningFreeAgents