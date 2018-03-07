const { authenticate } = require('../../authentication-anonymous').hooks;
const uuidv4 = require('uuid/v4');

const uuidHook = context => {
  context.data.question.questionId = uuidv4();

  // Best practise, hooks should always return the context
  return context;
};

module.exports = {
  before: {
    all: [authenticate('anonymous')],
    find: [],
    get: [],
    create: [ uuidHook ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
