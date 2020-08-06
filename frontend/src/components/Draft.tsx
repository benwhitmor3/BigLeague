import React from 'react';
import DraftDropdown from './Dropdowns/DraftDropdown';
import PlayerFormList from './Lists/PlayerFormList';
import useDraftedState from './Draft/useDraftedState';
import PlayersTable from "./Table/PlayersTable";


export default function Draft() {
    // const { drafted, addDrafted, deleteDrafted } = useDraftedState([]);

    // function Drafted() {
    //     return [drafted]
// }

    return (
      <div>

      {/*<DraftDropdown saveDrafted={draftedText => {*/}
      {/*    const trimmedText = draftedText.trim();*/}
      {/*      if (trimmedText.length > 0) {*/}
      {/*      addDrafted(trimmedText); } } } />*/}

      {/*<PlayerFormList drafted={drafted} deleteDrafted={deleteDrafted} />*/}

      <PlayersTable/>

      </div>

  );
}