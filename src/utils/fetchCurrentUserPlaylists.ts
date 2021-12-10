import axios from 'axios';
import getAccessToken from './getAccessToken';
import { CURRENT_USER_PLAYLISTS_URL } from '../constants';

/**
 * Get a list of the playlists owned or followed by the current Spotify user.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists}
 *
 * @param {number} [limit] - The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} [offset] - The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.
 * @return {Promise} contains an array of simplified playlist objects.
 */
const fetchCurrentUserPlaylists = async (limit = 20, offset = 0): Promise<any> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get(CURRENT_USER_PLAYLISTS_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      params: {
        limit,
        offset,
      },
    });

    if (response.status === 200) {
      const data = response.data;

      if (data?.total) {
        const { items, href, total } = data;
        return {
          items,
          href,
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

export default fetchCurrentUserPlaylists;
