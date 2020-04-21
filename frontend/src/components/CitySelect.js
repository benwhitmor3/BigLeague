import React, { useState } from "react";

function CitySelect(props) {
  const [city] = useState(props.data);
  const[selectedCity, updateSelectedCity] = useState([])

  function onSelectChange(event) {
    console.log(event.target.value);
  }

  function handleChange(event) {
    updateSelectedCity(event.target.value);
    if (props.onSelectChange) props.onSelectChange(selectedCity);
  }
  let options = city.map(city => (
    <option key={city.id} value={city.id}>
      {city.city}
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
export default CitySelect;