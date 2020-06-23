import React, {useEffect, useState} from "react";
import axios from "axios";
import ContractDropdowns from "../Dropdowns/ContractDropdowns";

function SigningPlayers() {
    const [player, setPlayer] = useState({players: [], isFetching: false});

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setPlayer({players: [], isFetching: true});
                const response = await axios.get('http://127.0.0.1:8000/api/players/');
                setPlayer({players: response.data, isFetching: false});
                // console.log(response);
            } catch (e) {
                // console.log(e);
                setPlayer({players: [], isFetching: false});
            }
        };
        fetchPlayers();
    }, []);

console.log(player.players);

  return (
      <div>
        <p>
        {
            player.players.map(player =>
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