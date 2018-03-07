const auth = require('@feathersjs/authentication');
const authentication = require('@feathersjs/authentication');
const commonHooks = require('feathers-hooks-common');
const anonymous = require('./passport/anonymous');

const authenticate = () =>
auth.hooks.authenticate(['jwt', 'anonymous' ]);

const anonymousAuth = function(app) {
  app.configure(
    anonymous({
      // the user service
      userService: 'users'
    })
  );
}
anonymousAuth.hooks = {
  authenticate: authenticate
};

module.exports = anonymousAuth;
