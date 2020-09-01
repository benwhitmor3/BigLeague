import React, {useState} from "react";
import {Select} from "../Select";

export const LineupPicker: React.FunctionComponent = () => {

    // console.log(roster.lineup)
    const [selected, setSelected] = useState("bench");

    let options = [{value: "", label: ""}, {value: "starter", label: "starter"}, {value: "rotation", label: "rotation"},
      {value: "bench", label: "bench"}];

    return <Select options={options} value={selected} onChange={setSelected}/>
  }

export default LineupPicker;