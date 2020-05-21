import React, {useState} from 'react';

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


const[salary, setSalary] = useState("Please Specify Contract Details");

function calculateSalary() {

    let contract = length;
    let grade = 5;
    let epv = 20;
    let renew = renewal;
    let t_option = teamoption;
    let p_option = playeroption;

    let salary = 0

    // is salary selected yet, if not equal null
    if (contract != 0 && contract != null) {
        salary = grade * (epv / contract)
    }
    else {
        salary = null
    }

    // is salary a number, if so adjust for renewal
    if (typeof salary == "number") {
        if (renew == "repeat") {
            salary += 2 * (epv / contract)
        }
        else if (renew == "non-repeat") {
            salary += 1 * (epv / contract)
        }
    }

    //is salary a number, if so adjust for t_option
    if (typeof salary == "number") {
        if (t_option > 0 && t_option < 5) {
            salary += (contract - t_option) * (epv / contract)
        }
        else if (t_option == 0) {
            salary = salary
        }
        else {
            salary = null
        }
    }


        //is salary a number, if so adjust for p_option
    if (typeof salary == "number") {
        if (p_option > 0 && p_option < 5) {
            salary -= (contract - p_option) * (epv / contract)
        }
        else if (p_option == 0) {
            salary = salary
        }
        else {
            salary = null
        }
    }


    if (salary == null) {
        setSalary("Please Specify Contract Details")
    }
    else {
        setSalary(salary.toFixed(0))
    }
}

function Sign() {
    console.log(salary);
}


// add comments about option value for select, and add filter where contract can't be bigger than contract.
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
       <button style={{border: '1px solid black',}} onClick={Sign}> Sign</button>

        &nbsp; Salary: &nbsp; {salary}

      </div>
  );
}

export default ContractDropdowns