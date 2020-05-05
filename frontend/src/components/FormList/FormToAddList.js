import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';


const FormToAddList = ({ saveList }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <div>
      <form
      onSubmit={event => {
        event.preventDefault();

        saveList(value);
        reset();
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add to List"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
    </div>
  );
};

export default FormToAddList;