import { VercelRequest, VercelResponse } from '@vercel/node';
import generateRandomString from './_lib/generateRandomString';
import { SPOTIFY_AUTHORIZE_URL, SCOPES } from './_lib/constants';
const queryString = require('query-string');

const login = (_req: VercelRequest, res: VercelResponse) => {
  console.log('login REDIRECT_URI -> ', process.env.REDIRECT_URI);
  console.log('login SPOTIFY_CLIENT_ID -> ', process.env.SPOTIFY_CLIENT_ID);
  console.log('login REDIRECT_URI -> ', process.env.REDIRECT_URI);

  if ('SPOTIFY_CLIENT_ID' in process.env && 'REDIRECT_URI' in process.env) {
    const loginURL =
      `${SPOTIFY_AUTHORIZE_URL}?` +
      queryString.stringify(
        {
          client_id: process.env.SPOTIFY_CLIENT_ID,
          response_type: 'code',
          redirect_uri: process.env.REDIRECT_URI,
          state: generateRandomString(16),
          scope: SCOPES,
        },
        { arrayFormat: 'comma' },
      );

    return res.redirect(loginURL);
  } else {
    return res.send(400).send({
      error: `Cannot process your request. 'SPOTIFY_CLIENT_ID' and/or 'REDIRECT_URI' keys are not set in your .env file.`,
    });
  }
};

export default login;
