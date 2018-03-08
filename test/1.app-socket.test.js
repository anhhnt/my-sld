const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');
const io = require('socket.io-client');
const assert = require('assert');
const app = require('../src/app');

describe(' "Websocket transport test"', () => {
  const port = app.get('port') || 3030;
  let socket, client, adminEmail;
  let eventCode;

  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', done);
    socket = io(`http://localhost:${port}`, {
      path: `/event/${eventCode}`
    });
    client = feathers();

    // Set up Socket.io client with the socket
    client.configure(socketio(socket, {
      timeout: 100000
    }));

    client.configure(auth({
      header: 'Authorization', // the default authorization header for REST
      path: '/authentication', // the server-side authentication service path
      jwtStrategy: 'jwt', // the name of the JWT authentication strategy
      entity: 'user', // the entity you are authenticating (ie. a users)
      service: 'users', // the service to look up the entity
      cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
      storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
      storage: undefined // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }));
  });

  after(function(done) {
    this.server.close(done);
  });

  it('Create admin account', async () => {
    adminEmail = Math.random().toString(36).substring(7) + '@some-domain.com';
    let admin = await client.service('admins').create({
      email: adminEmail,
      password: 'bonjour12'
    });

    console.log('Admin :', admin);
  });

  it('Login to admin account', async () => {
    await client.authenticate({
      strategy: 'local',
      email: adminEmail,
      password: 'bonjour12'
    });

    let jwtToken = await client.passport.getJWT();
    console.log('jwtToken', jwtToken);
  });

  it('Create an event ', async () => {
    const eventService = client.service('events');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const newEvent = await eventService.create({
      name: 'An test event',
      end: endDate,
      start: startDate,
    });

    eventCode = newEvent.eventCode;
    console.log(`        Event code for testing questions: ${eventCode}`);
  });

  it('Logout admin account', async () => {
    await client.logout();

    let jwt = await client.passport.getJWT()
    assert.ok(!jwt);
  });

  it('Create questions before anonymously logged in', async () => {
    // Receive real-time events through Socket.io
    client.service('questions')
      .on('created', q => console.log('New question created', q));
    client.service('events')
      .on('patched', ev => console.log('An event was modified', ev.eventCode));


    // Call the `question` service before authenticate
    let authenError;
    try {
      let newQuestion = await client.service('questions').create({
        eventCode: eventCode,
        question: {
          content: 'A question from a REST client'
        }
      });
    } catch (e) {
      authenError = e;
    }
    assert.equal(authenError.code, 401);
    assert.equal(authenError.name, 'NotAuthenticated');
  });

  it('Loggin anonymously', async () => {
    await client.authenticate({
      strategy: 'anonymous'
    });

    jwtToken = await client.passport.getJWT();
    assert.ok(jwtToken);

    let payload = await client.passport.verifyJWT(jwtToken);
    assert.equal(payload.sub, 'anonymous');
  });

  it ('Create question', async () => {
    let newQuestion = await client.service('questions').create({
      eventCode: eventCode,
      question: {
        content: 'A question from a REST client'
      }
    });
  });

  it ('Log out anonymously', async () => {
    await client.logout();
    let jwt = await client.passport.getJWT()
    assert.ok(!jwt);
  });
});
