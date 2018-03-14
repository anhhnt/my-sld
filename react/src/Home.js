import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

export default class Home extends Component {
  constructor () {
    super();
    this.state = {
      eventCode: ''
    };
    this.joinEvent = this.joinEvent.bind(this);
  }
  joinEvent (evt) {
    this.setState({
      eventCode: this.refs.eventCodeField.getValue()
    });
  }
  render() {
    const { login, loginChange, eventCodeSubmit, logInAsAdmin } = this.props;
    if (this.state.eventCode) {
      return <Redirect to={`/event/${this.state.eventCode}`} />
    } else {
      return  (
        <div>
        <TextField floatingLabelText="Enter event code" value={login.evenCode} ref='eventCodeField' />
        <br />
        <RaisedButton label="Access" primary={true} onClick={this.joinEvent}/>
        <br />
        <Paper style={paperStyle} zDepth={1} circle={true}>
        Or
        </Paper>
        <br />
        Log in as event manager
        <br />
        <TextField type="email" floatingLabelText="Email" value={login.email} onChange={loginChange('email')}/>
        <br />
        <TextField hintText="Password Field" floatingLabelText="Password" value={login.password} onChange={loginChange('password')} type="password" />
        <br />
        <RaisedButton label="Login" primary={true} onClick={logInAsAdmin}/>
        <br />
        <br />
        <RaisedButton label="Signup and login" primary={true} />
        </div>
      );
    }
  }
}
