import React, {useEffect, useState} from 'react';
import DraftDropdown from './Draft/DraftDropdown';
import DraftableList from "./Draft/DraftableList";
import Typography from '@material-ui/core/Typography';
import DraftedForm from './Draft/DraftedForm';
import DraftedList from './Draft/DraftedList';
import useDraftedState from './Draft/useDraftedState';

export default function Draft() {
    const { drafted, addDrafted, deleteDrafted } = useDraftedState([]);
    return (
      <div>
        <DraftableList/>
        <DraftDropdown/>
      <Typography component="h1" variant="h2">
        Draft this Player
      </Typography>

      <DraftedForm
        saveDrafted={draftedText => {
          const trimmedText = draftedText.trim();

          if (trimmedText.length > 0) {
            addDrafted(trimmedText);
          }
        }}
      />
      <DraftedList drafted={drafted} deleteDrafted={deleteDrafted} />
      </div>

  );
}