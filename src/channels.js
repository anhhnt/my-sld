module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').leave(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);
      if (connection.eventCode) {
        const channel = app.channel(connection.eventCode);
        channel.join(connection);
        channel.eventCode = connection.eventCode;
        // console.log(`New client join '${connection.eventCode}' channel`);
      }

      // Add it to the authenticated user channel
      //app.channel('authenticated').join(connection);
    }
  });

  app.publish((data, hook) => { // eslint-disable-line no-unused-vars
    // Publish all service events to all authenticated users
    // console.log(data)
    if (data.eventCode) {
      const channel = app.channel(data.eventCode);
      return channel;
    }
    return app.channel('anonymous');
  });

  app.service('questions').publish((data, context) => {
    const channel = app.channel(`${context.data.eventCode}`);
    return channel;
  });
};
