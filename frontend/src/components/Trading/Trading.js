import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import useTradingState from './useTradingState';


const Tradings = ({ saveList }) => {
  const { value, reset, onChange } = useTradingState();

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

export default Tradings;





