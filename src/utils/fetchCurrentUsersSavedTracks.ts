import axios from 'axios';
import getAccessToken from './getAccessToken';
import { CURRENT_USER_SAVED_TRACKS_URL } from '../constants';

/**
 * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks}
 * @param {number} [limit] - The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
 * @return {Promise}  contains an array of saved track objects (wrapped in a paging object) in JSON format.
 */
const fetchCurrentUsersSavedTracks = async (limit = 20): Promise<any> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get(CURRENT_USER_SAVED_TRACKS_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      params: {
        limit,
      },
    });

    if (response.status === 200) {
      const data = response.data;

      if (data?.items?.length) {
        const { items, href, next, total } = data;
        return {
          items,
          href,
          next,
          total,
        };
      }
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export default fetchCurrentUsersSavedTracks;
