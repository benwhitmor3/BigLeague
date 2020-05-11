import React, {useState, useEffect} from 'react';
import './Components.css';
import HowToAddFormList from '/Users/buw0017/projects/TheBigLeagueGame/frontend/src/components/FormList/HowToAddFormList.js';

export default function Stadium({ calculateTotal }) {
  const [seats, setSeats] = useState();
  const [boxes, setBoxes] = useState();
  const [total, setTotal] = useState(0);

    // Function to add numbers and update total in state
  function calculateTotal() {
      setTotal(seats + boxes);
      // setTotal((seats * 15000) + (boxes * 500000));
  }

  return (
    <div className="App">
      <h1>Stadium Cost</h1>

      <div className="number-inputs">
        <input
          type="number"
          value={seats}
          onChange={event => {
              setSeats(event.target.valueAsNumber);
              calculateTotal();
          }}
          placeholder="seats"
        />
        <input
          type="number"
          value={boxes}
          onChange={event => {
              setBoxes(event.target.valueAsNumber);
              calculateTotal();
          }}
          placeholder="boxes"
        />
      </div>

      <h3>{seats}</h3>
      <h3>{boxes}</h3>
      <h3>{total}</h3>
       <button onClick={calculateTotal}> Calculate</button>


        <HowToAddFormList/>

    </div>
  );
}