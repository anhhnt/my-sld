import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Event from './Event';
import logo from './logo.svg';
import './App.css';

const port = 3030;
let client;
class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: null,
      eventCode: '',
      questions: []
    };
    this.joinEvent = this.joinEvent.bind(this);
    this.updateEventCode = this.updateEventCode.bind(this);
  }

  connect() {
    let socket = io(`http://localhost:${port}`, {
      path: `/event/${this.state.eventCode}`
    });
    client = feathers();

    // Set up Socket.io client with the socket
    client.configure(socketio(socket, {
      timeout: 10000
    }));

    client.configure(auth({
      header: 'Authorization', // the default authorization header for REST
      path: '/authentication', // the server-side authentication service path
      jwtStrategy: 'jwt', // the name of the JWT authentication strategy
      entity: 'user', // the entity you are authenticating (ie. a users)
      service: 'users', // the service to look up the entity
      cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
      storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
      storage: undefined // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }));
  }



  async joinEvent () {
    this.connect();
    await client.authenticate({
      strategy: 'anonymous'
    });
    let jwt = await client.passport.getJWT();

    this.setState({
      jwt
    });
  }

  updateEventCode (evt) {
    this.setState({
      eventCode: evt.target.value
    });
  }

  componentDidMount() {
    // this.connect();
   //  client.authenticate({
   //   strategy: 'jwt'
   // });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {this.state.jwt ? (
            <Event
              questions={this.state.questions}
            />
          ) : (
            <Home evenCode={this.state.eventCode}
              eventCodeChange={this.updateEventCode}
              eventCodeSubmit={this.joinEvent}
            />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
