import express from 'express';
import oAuth from '../helpers/oauth';
import Oauth from '../controllers/oauth';

const router = express.Router();

router.get('/auth/:provider', oAuth.main);
router.get('/auth/:provider/callback', oAuth.callback, Oauth.loginSuccess);

export default router;
