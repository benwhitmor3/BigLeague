import React from 'react';
import List from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/List';
import ListItem from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItem';
import ListItemSecondaryAction from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItemSecondaryAction';
import ListItemText from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/ListItemText';
import IconButton from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/core/IconButton';
import DeleteIcon from '/Users/buw0017/projects/TheBigLeagueGame/node_modules/@material-ui/icons/Delete.js';



const PlayerFormList = ({ drafted, deleteDrafted }) => (
    <List>
    {drafted.map((drafted, index) => (
      <ListItem key={index.toString()} dense button>
        {/*<Checkbox tabIndex={-1} disableRipple />*/}
        <ListItemText primary={drafted} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              deleteDrafted(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default PlayerFormList;