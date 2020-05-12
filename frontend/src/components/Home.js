import React from 'react';
import CityDropdown from './Dropdowns/CityDropdown';
import PlayersTable from "./Table/PlayersTable";

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <CityDropdown/>
        <PlayersTable/>
      </div>

  );
}