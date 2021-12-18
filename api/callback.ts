import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { Buffer } from 'buffer';
import { SPOTIFY_TOKEN_URL } from '../src/constants';
const queryString = require('query-string');

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
).toString('base64');

export default async (_req: VercelRequest, res: VercelResponse) => {
  if (_req.method === 'GET') {
    if (_req.query?.state === null) {
      res.redirect(
        '/#' +
          queryString.stringify({
            error: 'state_mismatch',
          }),
      );
      return res
        .status(401)
        .send(`Error: Authorization rejected because of state mismatch`);
    } else if (_req.query?.error) {
      res.redirect(
        '/#' +
          queryString.stringify({
            error: _req.query?.error,
          }),
      );
      return res.status(401).send(`Authorization failed: ${_req.query?.error}`);
    } else {
      try {
        // if (
        //   process.env.NODE_ENV === 'production' &&
        //   _req.headers?.origin !== ORIGIN
        // ) {
        //   console.log('origin', _req.headers.origin);
        //   throw new Error('Invalid origin');
        // }

        const data = queryString.stringify({
          grant_type: 'authorization_code',
          redirect_uri: process.env.REDIRECT_URI,
          code: _req.query?.code,
        });

        const tokenResponse = await axios.post(SPOTIFY_TOKEN_URL, data, {
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(tokenResponse.data);

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
  } else {
    return res.status(400).send('Only GET method is supported.');
  }
};
