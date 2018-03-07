const assert = require('assert');
const app = require('../../src/app');
const uuidv4 = require('uuid/v4');

describe('Event service test', () => {
  var eventService;
  var eventId;
  it('register successfully', () => {
    const eventService = app.service('events');

    assert.ok(eventService != null, 'OK');
  });

  it('create new event', async () => {
    eventService = app.service('events');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const newEvent = await eventService.create({
      name: 'An test event',
      start: startDate,
      end: endDate
    });

    eventId = newEvent._id;
    console.log(`        Event code: ${newEvent.eventCode}`);
    assert.ok(newEvent, 'OK');
  });

  it('add questions to event', async () => {
    let modifiedEvent = await eventService.patch(eventId, {
      questions: [{
        questionId: uuidv4(),
        content: 'When will you quit?',
        upVote: 0,
        downVote: 0
      }]
    });

    const questions = modifiedEvent.questions;
    assert.ok(questions.length === 1, 'question inserted OK');

    questions.push({
      questionId: uuidv4(),
      content: 'What is your name?',
      upVote: 2,
      downVote: 0
    });
    modifiedEvent = await eventService.patch(eventId, {
      questions: questions
    });

  });
});
