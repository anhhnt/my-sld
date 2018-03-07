// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/admins.model');
const hooks = require('./admins.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'admins',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/admins', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('admins');

  service.hooks(hooks);
};
