import React, {useEffect, useState} from 'react';
import DraftDropdown from './Draft/DraftDropdown';
import DraftableList from "./Draft/DraftableList";

export default function Home() {
  return (
      <div>
        <DraftableList/>
        <DraftDropdown/>
      </div>

  );
}