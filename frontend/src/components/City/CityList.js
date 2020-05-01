import React, {useEffect, useState} from "react";
import axios from "axios";

function CityList() {
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

  return (
      <div>
        <p>
          {
            city.map(city => <p
                key={city.id}>{city.city}  &nbsp; {city.city_value}
            </p>)
          }
        </p>
      </div>
  );
}

export default CityList