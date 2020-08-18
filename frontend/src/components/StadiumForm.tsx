import React, {useState, useEffect} from 'react';
import './Stadium.css';
import axios from "axios";
import {Select} from "./Select";

// function for stadium component
export default function StadiumForm() {
  const [stadium_name, setStadium_Name] = useState<string>("");
  const [seats, setSeats] = useState<number>(0);
  const [boxes, setBoxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const[city, setCity] = useState<string>("London");
  // specify city and label to avoid any type allowed
  // options allows typescript to receive appropriate type [value: , label:]
  const [cities, setCities] = useState([{city: "", label: ""}]);
  let options = cities.map(cities => {return {value: cities.city, label: cities.city}});

  let franchise = "franchise";

    useEffect(() => {
        setTotal((seats * 15000) + (boxes * 500000));
    });

      useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cities/')
        .then(res => {
          setCities(res.data)
        })
        .catch(err => {
          console.log(err)
    })
  }, []);

    interface submitStadiumConfig {
    stadium_name: string;
    seats: number;
    boxes: number;
    franchise: string;
    city: string;
}

    const submitStadium = ({stadium_name, seats, boxes, franchise, city}: submitStadiumConfig) => {
    console.log({
            stadium_name: stadium_name,
            stadium_seats: seats,
            stadium_boxes: boxes,
            franchise: franchise,
            city: city
        });
          axios.post('http://127.0.0.1:8000/api/stadiums/',
        {
            stadium_name: stadium_name,
            stadium_seats: seats,
            stadium_boxes: boxes,
            franchise: franchise,
            city: city
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
    <div className="Stadium">
      <h1>Stadium Construction</h1>

    <p>Enter your Stadium Name</p>
    <input
          type="string"
          value={stadium_name}
          onChange={event => {
              setStadium_Name(event.currentTarget.value);
          }}
          placeholder="stadium name"
        />
    <p/>

        <label>
            Choose your city:
     <Select options={options} value={city} onChange={setCity}/>
        </label>


    <p>Enter your seats and boxes</p>

      <div className="number-inputs">
        <input
          type="number"
          value={seats}
          onChange={event => {
              setSeats(event.target.valueAsNumber);
          }}
          placeholder="seats"
          min={0}
        />
        <input
          type="number"
          value={boxes}
          onChange={event => {
              setBoxes(event.target.valueAsNumber);
          }}
          placeholder="boxes"
          min={0}
        />
      </div>

      <h4>{total ? '$' + +total/100000 + ' million' : ''}</h4>

      <div>
          {seats && boxes && stadium_name
        ? <button onClick={() =>submitStadium({stadium_name, seats, boxes, franchise, city})}>Submit Stadium Plan </button>
        : null}
      </div>

    </div>
  );
}