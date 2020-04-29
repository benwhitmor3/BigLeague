import React, {useState, useEffect} from 'react';
import axios from "axios";


export default function GM() {
  return <GMList />;
}

function GMList() {
  const[gm, setGm] = useState([]);
  const[selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/gm/')
        .then(res => {
          console.log(res)
          setGm(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, []);

  let dropdown = gm.map(gm => (
    <option key={gm.id} value={gm.value}>
        {gm.gm}
    </option>
  ));

  function pickGM () {
      console.log({selected})
  }

  return (
      <div>
        <p>
          {
            gm.map(gm =>
                <p key={gm.id}>
                    General Manager: {gm.gm}
                </p>)
          }
        </p>
        <select onChange={e => setSelected(e.currentTarget.value)}>
        <option>Select GM</option>
                {dropdown}
        </select>
      <h3>Hiring a {selected}</h3>
       <button onClick={pickGM}> Hire</button>
      </div>
  )
}