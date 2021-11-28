// Spotify Enpoints
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL =
  'https://api.spotify.com/v1/me/player/currently-playing';
const CURRENT_USER_PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists';
const PLAYLISTS_URL = 'https://api.spotify.com/v1/playlists';
const CURRENT_USER_RECENTLY_PLAYED_URL =
  'https://api.spotify.com/v1/me/player/recently-played';
const CURRENT_USER_SAVED_TRACKS_URL = 'https://api.spotify.com/v1/me/tracks';
const CURRENT_USER_TOP_ARTISTS_TRACKS_URL = 'https://api.spotify.com/v1/me/top';
const CURRENT_USER_PROFILE_URL = 'https://api.spotify.com/v1/me';

/**
 * Authorization scopes for accessing Spotify data
 * @see {@link https://developer.spotify.com/documentation/general/guides/authorization/scopes/}
 */
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

const ORIGIN = process.env.VERCEL_URL;

export {
  CURRENT_USER_PLAYLISTS_URL,
  CURRENT_USER_PROFILE_URL,
  CURRENT_USER_RECENTLY_PLAYED_URL,
  CURRENT_USER_SAVED_TRACKS_URL,
  CURRENT_USER_TOP_ARTISTS_TRACKS_URL,
  PLAYLISTS_URL,
  NOW_PLAYING_URL,
  SPOTIFY_AUTHORIZE_URL,
  SPOTIFY_TOKEN_URL,
  SCOPES,
  ORIGIN,
};
