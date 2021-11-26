import { VercelRequest, VercelResponse } from '@vercel/node';
const queryString = require('query-string');

const SCOPES = [
  'user-read-playback-state', // Read access to a user’s player state
  'user-read-currently-playing', // Read access to a user’s currently playing content
  'user-read-private', // Read access to user’s subscription details (type of user account)
  'user-read-email', // Read access to user’s email address.
  'user-follow-read', // Read access to the list of artists and other users that the user follows
  'user-library-read', // Read access to a user's library
  'user-read-playback-position', // Read access to a user’s playback position in a content
  'user-top-read', // Read access to a user's top artists and tracks
  'user-read-recently-played', // Read access to a user’s recently played track
  'playlist-read-collaborative', // Include collaborative playlists when requesting a user's playlists
  'playlist-read-private', // Read access to user's private playlists
];

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default (_req: VercelRequest, res: VercelResponse) => {
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
      { arrayFormat: 'comma' }
    );

  res.redirect(loginURL);
};
