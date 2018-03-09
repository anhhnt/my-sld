import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Event from './Event';
import Question from './Question';
import logo from './logo.svg';
import './App.css';

const port = 3030;
let client;

const QuestionWrapper = ({ match }) =>
  <Question eventCode={match.params.eventCode} />;

class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: null,
      login: {
        email: '',
        password: '',
        eventCode: ''
      },
      questions: []
    };
    this.joinEvent = this.joinEvent.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.logInAsAdmin = this.logInAsAdmin.bind(this);
  }

  getClient() {
    if (!client) {
      this.connect();
    }
    return client;
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
      storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }));
  }

  async joinEvent () {
    await this.getClient().authenticate({
      strategy: 'anonymous'
    });
    let jwt = await this.getClient().passport.getJWT();

    this.setState({
      jwt
    });
    // this.context.history.push(`/event/${this.state.login.eventCode}`);
  }

  updateLogin (fieldName) {
    return (evt) => {
      this.setState({
        login: Object.assign(this.state.login, {
          [fieldName]: evt.target.value
        })
      });
    }
  }

  async logInAsAdmin () {
    await this.getClient().authenticate({
      strategy: 'local',
      email: this.state.login.email,
      password: this.state.login.password
    });

    const jwt = await this.getClient().passport.getJWT();
    this.setState({
      jwt,
      admin: true
    });
  }

  async componentDidMount() {
    this.getClient().authenticate();
    const jwt = await this.getClient().passport.getJWT();
    if (jwt) {
      const payload = await client.passport.verifyJWT(jwt);
      this.setState({
        jwt,
        adminId: payload.adminId
      })
      if (payload.adminId) {
        const { data } = await this.getClient().service('events').find({
          adminId: payload.adminId
        });

        this.setState({
          events: data
        })
      }
    }
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            {this.state.jwt ? (
              <div>
                <Event
                  isAdmin={!!this.state.adminId}
                  events={this.state.events}
                  questions={this.state.questions}
                />
                <Route path="/event/:eventCode" render={props => (
                  <Question
                    {...props}
                    isAdmin={!!this.state.adminId}
                    client={this.getClient()}
                  />
                )}/>
              </div>
            ) : (
              <Home
                login={this.state.login}
                loginChange={this.updateLogin}
                eventCodeSubmit={this.joinEvent}
                logInAsAdmin={this.logInAsAdmin}
              />
            )}
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
