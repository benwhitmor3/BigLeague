import React, {useState, useEffect} from 'react';
import './Stadium.css';

//function for stadium component -- has two inputs and a conditional heading and button for cost
export default function Stadium() {
  const [seats, setSeats] = useState();
  const [boxes, setBoxes] = useState();
  const [total, setTotal] = useState(0);

    // function to update cost total based on seats and boxes
  useEffect(() => {
    setTotal((seats * 15000) + (boxes * 500000));
  });

  // function for submitting construction cost based on seat and box inputs
  function submitConstructionCost() {
      console.log(total)
  }

  return (
    <div className="Stadium">
      <h1>Stadium Construction</h1>

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
      <h4>{total ? '$' + total/1000000 + ' million' : 'Cost Unavailable'}</h4>
      <div>
          {total
        ? <button onClick={submitConstructionCost}>Submit Construction Plan </button>
        : null}
      </div>

    </div>
  );
}