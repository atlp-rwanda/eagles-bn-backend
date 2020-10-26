import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import models from '../database/models';

const googleOptions = {
  clientID: process.env.GOOGLE_CONSUMER_KEY,
  clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: `${process.env.BASE_URL}:${process.env.PORT || 4000}/api/auth/google/callback`,
};
const cbFunction = async (accessToken, refreshToken, profile, done) => {
  let user;
  // eslint-disable-next-line no-underscore-dangle
  const genUser = { ...profile._json };

  if (!genUser.first_name) genUser.first_name = genUser.given_name;
  if (!genUser.last_name) genUser.last_name = genUser.family_name;

  user = await models.User.findOne({ where: { email: genUser.email } });
  if (!user) {
    user = await models.User.create({
      first_name: genUser.first_name,
      last_name: genUser.last_name,
      email: genUser.email,
      password: 'None',
      isConfirmed: true
    });
  }
  done(null, user.dataValues);
};

const FBoptions = {
  clientID: process.env.FACEBOOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  profileFields: ['id', 'emails', 'name', 'displayName'],
  callbackURL: `${process.env.BASE_URL}:${process.env.PORT}/api/auth/facebook/callback`,
};

export default cbFunction;
export const googleStrategy = new GoogleStrategy(googleOptions, cbFunction);
export const facebookStrategy = new FacebookStrategy(FBoptions, cbFunction);
