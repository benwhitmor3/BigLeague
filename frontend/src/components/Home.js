import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <DataFetching />
      </div>

  );
}

function DataFetching() {
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
        <ul>
          {
            city.map(city => <li key={city.id}>{city.city} {city.city_value}</li>)
          }
        </ul>
        <select>
        <option>Select City</option>
                {dropdown}
        </select>
      </div>
  )
}