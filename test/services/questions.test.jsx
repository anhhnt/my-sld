const assert = require('assert');
const app = require('../../src/app');

describe('Question manipulation', () => {
  let questionService;
  let eventCode;
  let questionId;

  before(async () => {
    const eventService = app.service('events');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const newEvent = await eventService.create({
      name: 'An test event',
      end: endDate,
      start: startDate,
    });

    eventCode = newEvent.eventCode;
    console.log(`        Event code for testing question service: ${eventCode}`);
  });
  it('Add question', async () => {
    questionService = await app.service('questions');

    const createdQuestion = await questionService.create({
      eventCode: eventCode,
      question: {
        content: 'How long have you been here?',
        upVote: 0,
        downVote: 0
      }
    });

    questionId = createdQuestion.questionId;

    assert.ok(createdQuestion, 'question added');
    assert.ok(questionId, 'question ID hook works');
  });

  it (' manipulate question',  async () => {
    questionService = await app.service('questions');

    let votedQuestion = await questionService.upVote(eventCode, questionId);
    assert.ok(votedQuestion.upVote === 1, 'Upvote should be inscreased by  1');

    votedQuestion = await questionService.downVote(eventCode, questionId);
    assert.ok(votedQuestion.downVote === 1, 'Down vote should be inscreased by  1');

    let updatedQuestion = votedQuestion = await questionService.patch(questionId, {
      content: 'How long have you been here UPDATED ?'
    }, {
      eventCode
    });

    assert.ok(updatedQuestion.content.indexOf('UPDATED') > 0);
  });
});
