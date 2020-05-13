import React, {useState, useEffect} from 'react';
import './Stadium.css';

export default function Stadium() {
  const [seats, setSeats] = useState();
  const [boxes, setBoxes] = useState();
  const [total, setTotal] = useState(0);

    // Function to add numbers and update total state
  useEffect(() => {
    // Update the document title using the browser API
    setTotal((seats * 15000) + (boxes * 500000));
  });

  return (
    <div className="App">
      <h1>Stadium Cost</h1>

      <div className="number-inputs">
        <input
          type="number"
          value={seats}
          onChange={event => {
              setSeats(event.target.valueAsNumber);
          }}
          placeholder="seats"
        />
        <input
          type="number"
          value={boxes}
          onChange={event => {
              setBoxes(event.target.valueAsNumber);
          }}
          placeholder="boxes"
        />
      </div>

      <h3> Construction Cost: {total}</h3>

    </div>
  );
}