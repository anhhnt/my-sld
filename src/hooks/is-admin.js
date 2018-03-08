// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function () { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, data, params } = context;
    if (params && params.payload && params.payload.adminId) {
      const admin = await app.service('admins').find({
        _id: params.payload.adminId
      });
      if (!admin) {
        throw Error('NotAuthenticated');
      }
      data.adminId = params.payload.adminId;
      return context;
    }
    throw Error('NotAuthenticated');
  };
};
