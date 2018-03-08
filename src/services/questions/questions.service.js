const hooks = require('./questions.hooks');
const assert = require('assert');

module.exports = function (app) {
  const questionService = {
    async find(params) {
      return [];
    },
    async get(eventCode, params) {
      throw 'This method is not supported';
    },
    async findEventWithCode(eventCode) {
      assert.ok(eventCode, 'eventCode is mandatory');
      const eventService = app.service('events');
      const events = await eventService.find({
        query: {
          eventCode: eventCode,
          $select: ['_id', 'questions']
        }
      });
      return events.data.length > 0 ? events.data[0] : null;
    },
    async find({ query }) {
      const eventCode = query.eventCode;
      assert.ok(eventCode, 'eventCode is mandatory');
      const eventService = app.service('events');
      const events = await eventService.find({
        query: {
          eventCode: eventCode,
          $select: ['_id', 'questions']
        }
      });
      return events.data.length > 0 ? events.data[0] : null;
    },
    async create(data, params) {
      // console.log('              Creating question with content: ', data);
      const event = await this.findEventWithCode(data.eventCode);
      if (event) {
        const questions = event.questions || {};
        questions[data.question.questionId] = data.question;
        const eventService = app.service('events');
        await eventService.patch(event._id, {
          questions: questions
        });

        return data.question;
      }
      return false;
    },
    async vote(eventCode, questionId, isUp, undo) {
      assert.ok(eventCode, 'eventCode must not be empty');
      assert.ok(questionId, 'questionId must not be empty');
      const event = await this.findEventWithCode(eventCode);
      if (event && event.questions) {
        const question = event.questions[questionId];
        if (isUp) {
          question.upVote += undo ? -1 : 1;
        } else {
          question.downVote += undo ? -1 : 1;
        }
        await app.service('events').patch(event._id, {
          questions: event.questions
        });
        return question;
      }
      return false;
    },
    async upVote(eventCode, questionId) {
      return await this.vote(eventCode, questionId, true, false);
    },
    async downVote(eventCode, questionId) {
      return await this.vote(eventCode, questionId, false, false);
    },
    async update(id, data, params) {},
    async patch(questionId, data, params) {
      const event = await this.findEventWithCode(params.eventCode);
      if (event && event.questions) {
        const question = Object.assign({}, event.questions[questionId], data);
        await app.service('events').patch(event._id, {
          questions: event.questions
        });
        return question;
      }
      return false;
    },
    async remove(id, params) {},
    setup(app, path) {}
  };

  app.use('/questions', questionService);

  const service = app.service('questions');
  service.hooks(hooks);
};
