import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <CityDropdown />
      </div>

  );
}

function CityDropdown() {
  const[city, setCity] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/citychoice/')
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
        <p>
          {
            city.map(city => <p
                key={city.id}>{city.city}  &nbsp; {city.city_value}
            </p>)
          }
        </p>
        <select>
        <option>Select City</option>
                {dropdown}
        </select>
      </div>
  )
}