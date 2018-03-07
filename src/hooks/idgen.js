// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function () { // eslint-disable-line no-unused-vars
  return context => {
    context.data.eventCode = Math.random().toString(36).substring(7);

    // Best practise, hooks should always return the context
    return context;
  };
};
