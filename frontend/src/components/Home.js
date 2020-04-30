import React, {useState, useEffect} from 'react';
import CityDropdown from './City/CityDropdown';
import CityList from './City/CityList';

export default function Home() {
  return (
      <div>
      <h2>Welcome to the Big League</h2>
        <CityList/>
        <CityDropdown/>
      </div>

  );
}