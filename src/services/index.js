const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const admins = require('./admins/admins.service.js');
const events = require('./events/events.service.js');
const questions = require('./questions/questions.service');
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(admins);
  app.configure(events);
  app.configure(questions);
};
