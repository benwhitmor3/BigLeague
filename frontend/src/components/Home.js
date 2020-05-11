import React, {useState, useEffect} from 'react';
import CityDropdown from './Home/CityDropdown';
import CityList from './Home/CityList';
import CitiesTable from "./Table/CitiesTable";
import PlayersTable from "./Table/PlayersTable";

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <CityList/>
        <CityDropdown/>
        <CitiesTable/>
        <PlayersTable/>
      </div>

  );
}