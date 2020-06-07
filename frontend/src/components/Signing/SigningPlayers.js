import React, {useEffect, useState} from "react";
import axios from "axios";
import ContractDropdowns from "../Dropdowns/ContractDropdowns";
import useAxiosFetch from "../AxiosFetch";


function SigningPlayers() {
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


  useAxiosFetch('http://127.0.0.1:8000/api/players/', 500);


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
                    <ContractDropdowns name={player.name} epv={player.epv}/>
                </p>)
          }
        </p>
      </div>
  )
}

export default SigningPlayers