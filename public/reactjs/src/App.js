import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Event from './Event';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Home  />
          <Event questions={[{
            _id: 1,
            content: 'Subscribe to the insurance and benefit from the cancellation of your ticket, free of charge, up to 1 hour after the show starts'
          }, {
            _id: 2,
            content: 'Subscribe to the insurance and benefit from the cancellation of your ticket, free of charge, up to 1 hour after the show starts'
          }]} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
