import React, {useState, useEffect} from 'react';
import './Stadium.css';


// function for stadium component -- has two inputs and calculated total, with conditional rendered heading and button
export default function Stadium() {
  const [seats, setSeats] = useState<number>(0);
  const [boxes, setBoxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

    // function to update cost total based on seats and boxes (added plus-sign to parse as int)
    useEffect(() => {
        setTotal((+seats * 15000) + (+boxes * 500000));
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
      <h4>{total ? '$' + +total/100000 + ' million' : 'Cost Unavailable'}</h4>
      <div>
          {total
        ? <button onClick={submitConstructionCost}>Submit Construction Plan </button>
        : null}
      </div>

    </div>
  );
}