import React, {useEffect, useState} from "react";
import axios from "axios";
import {Select} from "../Select";


function CitySelector() {
  const[selected, setSelected] = useState("London");
  // specify and city to avoid any type allowed
  const [cities, setCities] = useState([{city: "", label: ""}]);
  // allows typescript to receive appropriate type [value: , label:]
  let options = cities.map(cities => {return {value: cities.city, label: cities.city}});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cities/')
        .then(res => {
          setCities(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, [])


  return (
      <div>
       <Select options={options} value={selected} onChange={setSelected}/>
      </div>
  );
}

export default CitySelector