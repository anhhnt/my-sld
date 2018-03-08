import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 50,
  width: 50,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  lineHeight: '50px'
};
export default () =>
  <div>
    <TextField
      floatingLabelText="Enter event code"
    />
    <br/>
    <RaisedButton label="Access" primary={true} />
    <br/>
    <Paper style={paperStyle} zDepth={1} circle={true} >
      Or
    </Paper>
    <br/>
    Log in as event manager
    <br/>
    <TextField
      type="email"
      floatingLabelText="Email"
    />
    <br/>
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    />
    <br/>
    <RaisedButton label="Login" primary={true} />
    <br/><br/>
    <RaisedButton label="Signup and login" primary={true} />
  </div>
