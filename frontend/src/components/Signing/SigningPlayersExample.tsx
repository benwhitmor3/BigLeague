import React, {useEffect, useState} from "react";
import axios from "axios";
import ContractDropdowns from "../Dropdowns/ContractDropdowns";

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

//   interface ServerResponse {
//   data: ServerData
// }
//
// interface ServerData {
//   foo: string
//   bar: number
// }
//
//   axios.request<ServerData>({
//   url: 'https://example.com/path/to/data',
//   transformResponse: (r: ServerResponse) => r.data
// }).then((response) => {
//   // `response` is of type `AxiosResponse<ServerData>`
//   const { data } = response
//   // `data` is of type ServerData, correctly inferred
// })


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