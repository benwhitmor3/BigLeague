import React, {useEffect, useState} from 'react';
import logo from '../Images/BigLeague_Gif.gif';
// @ts-ignore
import instructions from "../Instructions/BigLeagueInstructions.pdf";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import {Col, Row} from "antd";


export default function Home() {
    return (
<div>
  <h2>Welcome to the Big League</h2>
  {/*<img src={logo} alt="picture" />*/}
  <p>Please review the <a href = {instructions}>instructions</a> before starting</p>
  <br/>
<Row>
      <Register/>
      <Login/>
</Row>

</div>

  );
}