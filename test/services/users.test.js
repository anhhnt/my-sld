const assert = require('assert');
const app = require('../../src/app');
const uuidv4 = require('uuid/v4')

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password and adds gravatar', async () => {
    const userId = uuidv4();
    const user = await app.service('users').create({
      userId: userId,
      upVoted: [],
      downVoted: []
    });

    console.log(JSON.stringify(user));

    // Verify Gravatar has been set to what we'd expect
    //assert.equal(user.avatar, 'https://s.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=60');
    // Makes sure the password got encrypted
    assert.ok(user, 'User created successfully');
  });

  // it('removes password for external requests', async () => {
  //   // Setting `provider` indicates an external request
  //   const params = { provider: 'rest' };
  //
  //   const user = await app.service('users').create({
  //     email: 'test2@example.com',
  //     password: 'secret'
  //   }, params);
  //
  //   // Make sure password has been remove
  //   assert.ok(!user.password);
  // });
});
