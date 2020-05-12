import React, {useEffect, useState} from "react";
import axios from "axios";


function CityDropdown() {
  const[city, setCity] = useState([]);
  const[selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cities/')
        .then(res => {
          console.log(res)
          setCity(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, [])

  let dropdown = city.map(city => (
    <option key={city.city} value={city.city}>
      {city.city} {city.city_value}
    </option>
  ));

    function pickCity () {
      console.log({selected})
  }

  return (
      <div>
        <select onChange={e => setSelected(e.currentTarget.value)}>
        <option>Select City</option>
                {dropdown}
        </select>
          <p></p>
       <button onClick={pickCity}> Confirm City</button>
      </div>
  );
}

export default CityDropdown