import passport from 'passport';

const oAuth = {
  main: (req, res, next) => {
    const { provider } = req.params;
    const config = { scope: 'email' };
    if (provider === 'google') config.scope = ['profile', 'email'];
    return passport.authenticate(provider, config)(req, res, next);
  },
  callback: (req, res, next) => {
    const { provider } = req.params;
    passport.authenticate(provider, (err, user) => {
      if (err || !user) return next(err);
      req.user = user;
      return next();
    })(req, res, next);
  },
};
export default oAuth;
