import React, {useState, useEffect} from 'react';
import ContractDropdowns from "../Dropdowns/ContractDropdowns";
import SigningPlayers from "./SigningPlayers";
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
    <SigningPlayers/>
    </p>

      </div>
  );
}

export default Signing