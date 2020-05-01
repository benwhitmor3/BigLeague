import React, {useState, useEffect} from 'react';
import axios from "axios";

function ContractDropdowns() {
  const [contractlength] = React.useState([
    {label: "One Year", value: 1},
    {label: "Two Years", value: 2},
    {label: "Three Years", value: 3},
    {label: "Four Years", value: 4},
    {label: "Five Years", value: 5}
  ]);
  const [contractrenewal] = React.useState([
    {label: "No", value: "no"},
    {label: "Non-Repeat", value: "non-repeat"},
    {label: "Repeat", value: "repeat"},
  ]);
  //Make this a conditional select based on contract length?
  const [contractteamoption] = React.useState([
    {label: "None", value: []},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);
  //Make this a conditional select based on contract length?
  const [contractplayeroption] = React.useState([
    {label: "None", value: []},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);

  const[length, setLength] = useState([]);
  const[renewal, setRenewal] = useState([]);
  const[teamoption, setTeamOption] = useState([]);
  const[playeroption, setPlayerOption] = useState([]);

  let lengthdropdown = contractlength.map(contractlength => (
    <option key={contractlength.value} value={contractlength.value}>
    {contractlength.label}
    </option>
));
  let renewaldropdown = contractrenewal.map(contractrenewal => (
    <option key={contractrenewal.value} value={contractrenewal.value}>
    {contractrenewal.label}
    </option>
));
  let teamoptiondropdown = contractteamoption.map(contractteamoption => (
    <option key={contractteamoption.value} value={contractteamoption.value}>
    {contractteamoption.label}
    </option>
));
  let playeroptiondropdown = contractplayeroption.map(contractplayeroption => (
    <option key={contractplayeroption.value} value={contractplayeroption.value}>
    {contractplayeroption.label}
    </option>
));

let ren_value = 0;
    if (renewal === "non-repeat") {
        ren_value = 1;
    } else {
        ren_value = 2;
    }

const[salary, setSalary] = useState("n/a");
function handleSalary() {
    let grade = 5;
    let epv = 20;
setSalary(ren_value + (grade * (epv / length + 1 )).toFixed(0));
}

function signPlayer () {
      console.log({length}, {renewal}, {teamoption}, {playeroption})
  }


  return (
    <div>
        <select onChange={e => setLength(e.currentTarget.value)}>
        <option>Select Contract Length</option>
                {lengthdropdown}
        </select>
        <select onChange={e => setRenewal(e.currentTarget.value)}>
        <option>Select Renewal</option>
                {renewaldropdown}
        </select>

        <select onChange={e => setTeamOption(e.currentTarget.value)}>
        <option>Select Team Option</option>
                {teamoptiondropdown}
        </select>

        <select onChange={e => setPlayerOption(e.currentTarget.value)}>
        <option>Select Player Option</option>
                {playeroptiondropdown}
        </select>

        &nbsp;
       <button onClick={handleSalary}> Negotiate</button>

        &nbsp; Salary: &nbsp; {salary}

      </div>
  );
}

export default ContractDropdowns