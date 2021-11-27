import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { Buffer } from 'buffer';
const queryString = require('query-string');

const SPOTIFY_URL_GENERATE_TOKEN = 'https://accounts.spotify.com/api/token';
const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64');
console.log('basic -> ', basic);

export default async (_req: VercelRequest, res: VercelResponse) => {
  console.log('callback REDIRECT_URI -> ', process.env.REDIRECT_URI);

  console.log(_req.query);

  if (_req.method === 'GET') {
    if (_req.query?.state === null) {
      res.redirect(
        '/#' +
          queryString.stringify({
            error: 'state_mismatch',
          })
      );
    } else if (_req.query?.error) {
      res.redirect(
        '/#' +
          queryString.stringify({
            error: _req.query?.error,
          })
      );
    } else {
      try {
        if (
          process.env.NODE_ENV === 'production' &&
          _req.headers?.origin !== 'https://scriptified.dev'
        ) {
          throw new Error('Invalid origin');
        }

        const response = await axios.post(
          SPOTIFY_URL_GENERATE_TOKEN,
          {
            code: _req.query?.code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REDIRECT_URI,
          },
          {
            headers: {
              Authorization: `Basic ${basic}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(response);

        res.status(200).json(response);
      } catch (error) {
        if (error?.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error?.response?.data);
          console.log(error?.response?.status);
          //   console.log(error.response.headers);
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
        //   console.error(error);
        return res.status(422).send('Error');
      }
    }
  }
};

// {
//   code: 'AQCx-S2bzNM9981CgWXRbUgIpBsLFMH1a2bX71Fn5fe9RYrla3DKnXVhdzhC3Dk6xSQEkFMbfxRr9i9xdj8LzNRfIwEYM0A9NMc9Htn76SUevRD8f_8CJzn1DOlMwjNbUR0Rov_v3KcBHRizzjt2ZDSSVHbTAGRq_8GsBEKdLRw1s0EjR9Zv8o4JsBgevTlG9T9mjW3wlUzff0ucrpk7dw4rsRpTJZWpj5_fDWfpQ2PB3DXGCzsuHNO1IvbkhgcmNU74hCN8PxFy9SR4noHtxIo7yaorYNzFGYfH4eWbOYi_wgL4gueZzGHIq8q3yO85YiaBlMtZ8NMSuVG6P1w_JyvcaKzNM_h4_SHVxr17sqWPOb-0q2ioDy9ALLXbrvFRR_E9b4JLLW2m1fPp3mRNqMHhBk0qkGvQc6eyF3c_B2Qunj6Oxh4tUdutCIxTtKEkI2gopAyckHwfWBrWMzN8w03r48e3-FpcBm3FNmexDxQBFxDop76mIxmiwnJNaDBlag'
// }
