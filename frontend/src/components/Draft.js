import React, {useEffect, useState} from 'react';
import DraftableList from "./Draft/DraftableList";
import DraftDropdown from './Draft/DraftDropdown';
import DraftedList from './Draft/DraftedList';
import useDraftedState from './Draft/useDraftedState';


export default function Draft() {
    const { drafted, addDrafted, deleteDrafted } = useDraftedState([]);

    function Drafted() {
    console.log(drafted)
        return [drafted]
}

    return (
      <div>

      <DraftableList/>

      <DraftDropdown saveDrafted={draftedText => {
          const trimmedText = draftedText.trim();
            if (trimmedText.length > 0) {
            addDrafted(trimmedText); } } } />

      <DraftedList drafted={drafted} deleteDrafted={deleteDrafted} />
      <Drafted/>
      </div>

  );
}