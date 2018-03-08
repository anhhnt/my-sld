import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const wrapperStyle = {
  textAlign: 'left'
};

const buttonsContainerStyle = {
  float: 'right'
}

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }
  async componentDidMount() {
    console.log(this.props);
    const { client, match } = this.props;
    const { eventCode } = match.params;
    console.log('eventCode', eventCode);
    const { questions } = await client.service('questions').find({
      query: {
        eventCode: eventCode
      }
    });
    console.log(questions);
    this.setState({
      questions: Object.values(questions)
    })

  }
  render() {
    return (<div style={wrapperStyle}>
      {this.props.isAdmin || <TextField
        hintText="Type your question"
        multiLine={true}
        rows={2}
        rowsMax={4}
        fullWidth={true}
      />}
      <List>
        {this.state.questions.map((q) =>
          <ListItem key={q._id}>
            <div>
              {q.content}
            </div>
            <div style={buttonsContainerStyle}>
              <FontIcon className="material-icons" style={iconStyles}>thumb_down</FontIcon>
              <FontIcon className="material-icons" style={iconStyles}>thumb_up</FontIcon>
            </div>
            <div style={buttonsContainerStyle}>
              <FontIcon className="material-icons" style={iconStyles}>mode_edit</FontIcon>
              <FontIcon className="material-icons" style={iconStyles}>delete</FontIcon>
            </div>
          </ListItem>
        )}
      </List>
    </div>)
  }
}
