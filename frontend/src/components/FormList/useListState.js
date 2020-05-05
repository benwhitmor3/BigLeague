import { useState } from 'react';

export default initialValue => {
  const [list, setList] = useState(initialValue);

  return {
    list,
    addList: listText => {
      setList([...list, listText]);
    },
    deleteList: listIndex => {
      const newList = list.filter((_, index) => index !== listIndex);

      setList(newList);
    }
  };
};