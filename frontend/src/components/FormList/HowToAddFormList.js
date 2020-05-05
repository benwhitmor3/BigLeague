import FormToAddList from "./FormToAddList";
import ListFromForm from "./ListFromForm";
import React from "react";
import useListState from "./useListState";


export default function HowToAddFormList() {

    const { list, addList, deleteList } = useListState([]);

    return (
          <div>
        <FormToAddList
        saveList={listText => {
          const trimmedText = listText.trim();

          if (trimmedText.length > 0) {
            addList(trimmedText);
          }
        }}
      />
      <ListFromForm list={list} deleteList={deleteList} />
          </div>
);
}