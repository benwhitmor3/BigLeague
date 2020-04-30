import React, {useEffect, useState} from 'react';
import GMDropdown from './GM/GMDropdown';
import GMList from "./GM/GMList";

export default function GM() {
  return (
      <div>
        <GMList/>
        <GMDropdown/>
      </div>

  );
}