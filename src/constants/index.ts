// Spotify Enpoints
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const CURRENT_USER_PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists';
const PLAYLISTS_URL = 'https://api.spotify.com/v1/playlists';
const CURRENT_USER_RECENTLY_PLAYED_URL =
  'https://api.spotify.com/v1/me/player/recently-played';
const CURRENT_USER_SAVED_TRACKS_URL = 'https://api.spotify.com/v1/me/tracks';
const CURRENT_USER_TOP_ARTISTS_TRACKS_URL = 'https://api.spotify.com/v1/me/top';
const CURRENT_USER_PROFILE_URL = 'https://api.spotify.com/v1/me';

const ORIGIN = process.env.VERCEL_URL;

export {
  CURRENT_USER_PLAYLISTS_URL,
  CURRENT_USER_PROFILE_URL,
  CURRENT_USER_RECENTLY_PLAYED_URL,
  CURRENT_USER_SAVED_TRACKS_URL,
  CURRENT_USER_TOP_ARTISTS_TRACKS_URL,
  PLAYLISTS_URL,
  NOW_PLAYING_URL,
  ORIGIN,
};
