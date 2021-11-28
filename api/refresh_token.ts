import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { SPOTIFY_TOKEN_URL, ORIGIN } from '../src/constants';
const queryString = require('query-string');

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64');

export default async (_req: VercelRequest, res: VercelResponse) => {
  if (_req.method === 'POST') {
    if (_req.body?.refresh_token === null) {
      return res
        .status(401)
        .send(`Error: refresh_token is undefined in request query parameters`);
    }
    try {
      if (
        process.env.NODE_ENV === 'production' &&
        _req.headers?.origin !== ORIGIN
      ) {
        throw new Error('Invalid origin');
      }

      const data = queryString.stringify({
        grant_type: 'refresh_token',
        refresh_token: _req.body?.refresh_token,
      });

      const tokenResponse = await axios.post(SPOTIFY_TOKEN_URL, data, {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      res.status(tokenResponse.status).send(tokenResponse.data);
    } catch (error) {
      if (error?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error?.response?.data);
        console.log(error?.response?.status);
        console.log(error.response.headers);
      } else if (error?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error?.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error?.message);
      }
      console.log(error?.config);
      return res.status(error?.response?.status).send(error?.response?.data);
    }
  }
};
