import React from 'react';
import List from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/List';
import ListItem from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItem';
import ListItemSecondaryAction from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItemSecondaryAction';
import ListItemText from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItemText';
import Checkbox from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/Checkbox';
import IconButton from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/IconButton';
import DeleteIcon from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/icons/Delete.js';

const ListFromForm = ({ list, deleteList }) => (
  <List>
    {list.map((list, index) => (
      <ListItem key={index.toString()} dense button>
        <Checkbox tabIndex={-1} disableRipple />
        <ListItemText primary={list} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              deleteList(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default ListFromForm;