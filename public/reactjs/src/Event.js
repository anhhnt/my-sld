import React from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

const wrapperStyle = {
  textAlign: 'left'
};

export default ({ isAdmin, events = [], questions }) =>
  (<div style={wrapperStyle}>
    {isAdmin || <TextField
      hintText="Type your question"
      multiLine={true}
      rows={2}
      rowsMax={4}
      fullWidth={true}
    />}
    <List>
      {events.map(e => (
        <ListItem key={e._id}>
          <Link to={`/event/${e.eventCode}`}>
            {e.name}
            <br/>
            Code: {e.eventCode}
            <br/>
            Start: {e.start}
            <br/>
            End: {e.end}
          </Link>
        </ListItem>)
      )}
    </List>
  </div>
)
