import React, {useState} from 'react';

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
  const [salary, setSalary] = useState(0);

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

    const [grade, setGrade] = useState(null);

function calculateGrade() {

    // variables based on dropdown (need to parse from string to int)
    let contract = parseInt(length);
    let renew = renewal;
    let t_option = parseInt(teamoption);
    let p_option = parseInt(playeroption);
    // variable passed with function
    let epv = player.epv;
    let age = player.age;

    let grade = 0

    // is contract is greater than zero
    if (contract > 0) {
        // set initial base salary
        grade = (salary * (contract + 1)) / epv;
            // adjust for renewal
            if (renew == "repeat") {
                grade -= 2
            }
            else if (renew == "non-repeat") {
                grade -= 1
            }
            // adjust for t_option
            if (t_option > 0) {
                grade -= (contract - t_option)
            }
            // adjust for p_option
            if (p_option > 0) {
                grade += 0.5*(contract - p_option)
            }
            // adjust for age
            if (age >= 27) {
                grade += age - 26
            }
            // set salary after all adjustments
        setGrade(grade.toFixed(2));
            // stopper for invalid contracts where option is greater than contract length
            if (contract < p_option || contract < t_option) {
        setGrade("Illegal Contract")
            }
    }
    else {
        grade = null
    }
}

function signPlayer() {
    console.log("Signing " + player.name + ' for ' + salary + ' with grade ' + grade)
}

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

      <label>
        <input
          type="number"
          value={salary}
          placeholder={"Salary"}
          style={{margin: '0.5rem', width: '80%',}}
          onChange={e => setSalary(e.target.value)}
        />
      </label>


        &nbsp;
       <button style={{margin: '0.5rem', border: '1px solid black',}} onClick={calculateGrade}> Calculate Grade</button>

         {grade ? 'Grade: '+ grade : "Please Specify Contract Details"}

        <button style={{margin: '0.5rem', border: '1px solid black',}} onClick={signPlayer}> Submit Offer</button>

      </div>
  );
}

export default ContractDropdowns