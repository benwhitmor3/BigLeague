import React, {useEffect, useState} from "react";
import axios from "axios";


function CityDropdown() {
  const[city, setCity] = useState([])

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
    <option key={city.id} value={city.name}>
      {city.city} {city.city_value}
    </option>
  ));

  return (
      <div>
        <select>
        <option>Select City</option>
                {dropdown}
        </select>
      </div>
  );
}

export default CityDropdown