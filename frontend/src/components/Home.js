import React from 'react';
import CityDropdown from './Dropdowns/CityDropdown';
import logo from './Images/BigLeague_Gif.gif';
import instructions from "./Instructions/BigLeagueInstructions.pdf";

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <img src={logo} alt="picture" />
          <p>Please review the <a href = {instructions}>instructions</a> before starting</p>
          <p>Choose the Location of your Franchise</p>
        <CityDropdown/>
      </div>

  );
}