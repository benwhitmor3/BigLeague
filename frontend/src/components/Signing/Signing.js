import React, {useState, useEffect} from 'react';

function Signing() {
  const [contractlength] = React.useState([
    {label: "One Year", value: 1},
    {label: "Two Years", value: 2},
    {label: "Three Years", value: 3},
    {label: "Four Years", value: 4},
    {label: "Five Years", value: 5},
  ]);

    const [contractrenewal] = React.useState([
    {label: "No", value: "no"},
    {label: "Non-Repeat", value: "non-repeat"},
    {label: "Repeat", value: "repeat"},
  ]);

  return (
    <div>
      <select>
      {contractlength.map(contractlength => (
        <option key={contractlength.value} value={contractlength.value}>
          {contractlength.label}
        </option>
      ))}
    </select>

    <select>
      {contractlength.map(contractlength => (
        <option key={contractlength.value} value={contractlength.value}>
          {contractlength.label}
        </option>
      ))}
    </select>
      </div>
  );
}

export default Signing