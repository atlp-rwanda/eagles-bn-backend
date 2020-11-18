const jwtAuth = require('socketio-jwt-auth');

export default jwtAuth.authenticate({
  secret: process.env.ACCESS_TOKEN_SECRET,
}, (payload, done) => {
  done(null, payload);
});
