import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 50,
  width: 50,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  lineHeight: '50px',
};

const RoutingButton = withRouter(({ history }) => (
  <RaisedButton label="Access" primary={true} onClick={() => {
    history.push(`/event/${1234}`)
  }} />
));

export default ({ login, loginChange, eventCodeSubmit, logInAsAdmin }) => (
  <div>
    <TextField
      floatingLabelText="Enter event code"
      value={login.evenCode}
      onChange={loginChange('eventCode')}
    />
    <br />
    <RaisedButton label="Access" primary={true} onClick={eventCodeSubmit} />
    <br />
    <Paper style={paperStyle} zDepth={1} circle={true}>
      Or
    </Paper>
    <br />
    Log in as event manager
    <br />
    <TextField
      type="email"
      floatingLabelText="Email"
      value={login.email}
      onChange={loginChange('email')}
    />
    <br />
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      value={login.password}
      onChange={loginChange('password')}
      type="password"
    />
    <br />
    <RaisedButton label="Login" primary={true} onClick={logInAsAdmin} />
    <br />
    <br />
    <RaisedButton label="Signup and login" primary={true} />
  </div>
);
