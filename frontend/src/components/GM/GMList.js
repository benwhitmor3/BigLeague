import React, {useState, useEffect} from 'react';
import axios from "axios";

function GMList() {
  const[gm, setGm] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/gms/')
        .then(res => {
          console.log(res)
          setGm(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, []);

  return (
      <div>
        <p>
          {
            gm.map(gm =>
                <p key={gm.id}>
                    General Manager: {gm.trait}
                </p>)
          }
        </p>
      </div>
  )
}

export default GMList