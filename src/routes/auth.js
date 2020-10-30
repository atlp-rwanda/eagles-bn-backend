import express from 'express';
import oAuth from '../middlewares/auth';
import OauthController from '../controllers/oauth.controller';

const router = express.Router();

router.get('/auth/:provider', oAuth.main);
router.get('/auth/:provider/callback', oAuth.callback, OauthController.loginSuccess);

export default router;
