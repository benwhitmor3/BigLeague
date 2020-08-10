import React, {useState} from 'react';
import axios from "axios";


//add conditional dropdown, so that team and player option are always less than contract length

function ContractDropdowns(player) {
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
    {label: "None", value: 0},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);
  //Make this a conditional select based on contract length?
  const [contractplayeroption] = React.useState([
    {label: "None", value: 0},
    {label: "Year One", value: 1},
    {label: "Year Two", value: 2},
    {label: "Year Three", value: 3},
    {label: "Year Four", value: 4},
  ]);

  const[length, setLength] = useState(null);
  const[renewal, setRenewal] = useState(null);
  const[teamoption, setTeamOption] = useState(null);
  const[playeroption, setPlayerOption] = useState(null);

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


const[salary, setSalary] = useState();

function calculateSalary() {

    // variables based on dropdown (need to parse from string to int)
    let contract = parseInt(length);
    let renew = renewal;
    let t_option = parseInt(teamoption);
    let p_option = parseInt(playeroption);
    // always fixed at 5 for drafted players (age not an issue for drafted players)
    let grade = 5;
    // variable passed with function
    let epv = player.epv;

    let salary = 0;

    // is contract is greater than zero
    if (contract > 0) {
        // set initial base salary
        salary = grade * (epv / (contract+1));
            // adjust for renewal
            if (renew == "repeat") {
                salary += 2 * (epv / contract)
            }
            else if (renew == "non-repeat") {
                salary += 1 * (epv / contract)
            }
            // adjust for t_option
            if (t_option > 0) {
                salary += (contract - t_option) * (epv / contract)
            }
            // adjust for p_option
            if (p_option > 0) {
                salary -= (contract - p_option) * (epv / contract)
            }
            // set salary after all adjustments
        setSalary(salary.toFixed(1));
            // stopper for invalid contracts where option is greater than contract length
            if (contract < p_option || contract < t_option) {
        setSalary("Illegal Contract")
            }
    }
    else {
        salary = null
    }
}

function signPlayer() {
    console.log("Signing " + player.name + ' for ' + salary + ' with grade ' + 5);
      axios.patch('http://127.0.0.1:8000/api/players/' + player.name + '/',
    {
        name: player.name,
        contract: length,
        t_option: teamoption,
        p_option: playeroption,
        renew: renewal,
        salary: salary,
        grade: 5
    }
)
        .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
};


  return (
    <div>
        <select onChange={e => setLength(e.currentTarget.value)}>
        <option value={0}>Select Contract Length</option>
                {lengthdropdown}
        </select>
        <select onChange={e => setRenewal(e.currentTarget.value)}>
        <option value={"no"}>Select Renewal</option>
                {renewaldropdown}
        </select>

        <select onChange={e => setTeamOption(e.currentTarget.value)}>
        <option value={0}>Select Team Option</option>
                {teamoptiondropdown}
        </select>

        <select onChange={e => setPlayerOption(e.currentTarget.value)}>
        <option value={0}>Select Player Option</option>
                {playeroptiondropdown}
        </select>

        &nbsp;
       <button style={{margin: '0.5rem', border: '1px solid black',}} onClick={calculateSalary}> Negotiate</button>

         {(salary >= 0) ? 'Salary: $' + salary + ' million' : "Please Specify Contract Details"}
         {(salary === "Illegal Contract") ? ' (Illegal Contract)' : null}

        <button style={{margin: '0.5rem', border: '1px solid black',}} onClick={signPlayer}> Sign</button>

      </div>
  );
}

export default ContractDropdowns