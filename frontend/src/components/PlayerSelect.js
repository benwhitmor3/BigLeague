import React, { useState } from "react";

function PlayerSelect(props) {
  const [player] = useState(props.data);
  const[selectedPlayer, updateSelectedPlayer] = useState([])

  function onSelectChange(event) {
    console.log(event.target.value);
  }

  function handleChange(event) {
    updateSelectedPlayer(event.target.value);
    if (props.onSelectChange) props.onSelectChange(selectedPlayer);
  }
  let options = player.map(player => (
    <option key={player.id} value={player.id}>
      {player.player}
    </option>
  ));
  return (
    <select
      name="customSearch"
      className="custom-search-select"
      onChange={handleChange}
    >
      <option>Select Item</option>
      {options}
    </select>
  );
}
export default PlayerSelect;