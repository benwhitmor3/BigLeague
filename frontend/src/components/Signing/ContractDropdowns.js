import React, {useState, useEffect} from 'react';
import axios from "axios";

//add conditional dropdown, so that team and player option are always less than contract length

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
    {label: "None", value: ""},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);
  //Make this a conditional select based on contract length?
  const [contractplayeroption] = React.useState([
    {label: "None", value: ""},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);

  const[length, setLength] = useState("Select Contract Length");
  const[renewal, setRenewal] = useState("Select Renewal");
  const[teamoption, setTeamOption] = useState("Select Team Option");
  const[playeroption, setPlayerOption] = useState("Select Player Option");

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


const[salary, setSalary] = useState("Ready for Negotiation!");

function handleSalary() {

let grade = 5;
let epv = 25;
let age = 25;
let contractlength = length;
let calculatedsalary = 0;

    if (length !== "Select Contract Length") {
        calculatedsalary += grade * (epv / (contractlength));
    }
    else {
        calculatedsalary = "NaN"
    }

    if (renewal !== "Select Renewal" && renewal === "repeat") {
        calculatedsalary += 4 * (epv / (contractlength));
    }
    else if (renewal !== "Select Renewal" && renewal === "non-repeat") {
        calculatedsalary += 2 * (epv / (contractlength));
    }
    else if (renewal !== "Select Renewal" && renewal === "no") {
        calculatedsalary = calculatedsalary
    }
        else {
        calculatedsalary = "NaN"
    }

    //if team option doesn't equal label then that means it has a value 0-5
    if (teamoption !== "Select Team Option" && teamoption !== "") {
        calculatedsalary += ((epv / contractlength) * (contractlength - teamoption));
    }
    else {
        calculatedsalary = calculatedsalary
    }

    //if player option doesn't equal label then that means it has a value 0-5
    if (playeroption !== "Select Player Option" && playeroption !== "") {
        calculatedsalary -= ((epv / contractlength) * 0.5 * (contractlength - playeroption));
    }
    else {
        calculatedsalary = calculatedsalary
    }

    if (age >= 27) {
        calculatedsalary -= (age - 26) * (epv / (length + 1))
    }
    else {
        calculatedsalary = calculatedsalary
    }


    if (calculatedsalary === "NaN") {
        setSalary("NaN");
    }
    else {
        setSalary(calculatedsalary.toFixed(0));
    }

    console.log(length)
    console.log(renewal)
    console.log(teamoption)
    console.log(playeroption)

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