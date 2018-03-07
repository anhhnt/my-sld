// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function () { // eslint-disable-line no-unused-vars
  return context => {
    if (context.params && context.params.payload && context.params.payload.adminId) {
      return context;
    }
    throw Error('NotAuthenticated');
  };
};
