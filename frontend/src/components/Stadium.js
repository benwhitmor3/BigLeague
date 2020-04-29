import React, {useState, useEffect} from 'react';
import './Components.css';

export default function Stadium(){
    const [seats, setSeats] = useState("");
  const [boxes, setBoxes] = useState("");
  const [total, setTotal] = useState(seats * 15000 + boxes * 500000);

    // Function to add numbers and update total in state
  function calculateTotal() {
    setTotal(seats * 15000 + boxes * 500000);
  }

  return (
    <div className="App">
      <h1>Stadium Cost</h1>

      <div className="number-inputs">
        <input
          type="number"
          value={seats}
          onChange={e => setSeats(e.target.value)}
          placeholder="seats"
        />
        <input
          type="number"
          value={boxes}
          onChange={e => setBoxes(e.target.value)}
          placeholder="boxes"
        />
      </div>

       <button onClick={calculateTotal}>Calculate</button>

      <h3>{total}</h3>
    </div>
  );
}