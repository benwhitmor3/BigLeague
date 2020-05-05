import { useState } from 'react';

export default initialValue => {
  const [drafted, setDrafted] = useState(initialValue);

  return {
    drafted,
    addDrafted: draftedText => {
      setDrafted([...drafted, draftedText]);
    },
    deleteDrafted: draftedIndex => {
      const newDrafted = drafted.filter((_, index) => index !== draftedIndex);

      setDrafted(newDrafted);
    }
  };
};