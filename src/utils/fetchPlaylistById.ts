import getAccessToken from './getAccessToken';
import { PLAYLISTS_URL } from '../constants';
import axios from 'axios';

/**
 * Get a playlist owned by a Spotify user.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist}
 * @param {string} playlist_id The Spotify ID for the playlist.
 * @return {Promise}  a playlist object.
 */
const fetchPlaylistById = async (playlist_id: string): Promise<any> => {
  const access_token = await getAccessToken();
  const PLAYLISTS_URL_BY_ID = `${PLAYLISTS_URL}/${playlist_id}`;

  try {
    const response = await axios.get(PLAYLISTS_URL_BY_ID, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = response.data;

      if (data !== null) {
        return data;
      }
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export default fetchPlaylistById;
