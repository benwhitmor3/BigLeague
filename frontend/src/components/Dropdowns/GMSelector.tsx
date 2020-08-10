import React, {useEffect, useState} from "react";
import axios from "axios";
import {Select} from "../Select";


function GMSelector() {
  const[selected, setSelected] = useState("Facilitator");
  // specify and city to avoid any type allowed
  const [gm, setGM] = useState([{trait: "", label: ""}]);
  // allows typescript to receive appropriate type [value: , label:]
  let options = gm.map(gm => {return {value: gm.trait, label: gm.trait}});

  let franchise = "franchise";

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/gms/')
        .then(res => {
          setGM(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, [])

    interface submitGMConfig {
    selected: string;
    franchise: string;
}

    const submitGM = ({selected, franchise}: submitGMConfig) => {
    console.log({
            trait: selected,
            franchise: franchise
        });
          axios.put('http://127.0.0.1:8000/api/gms/',
        {
            trait: selected,
            franchise: franchise
        }
    )
            .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
    })
};


  return (
      <div>
       <Select options={options} value={selected} onChange={setSelected}/>
        <button onClick={() =>submitGM({selected, franchise})}>Submit Stadium Plan </button>
      </div>
  );
}

export default GMSelector