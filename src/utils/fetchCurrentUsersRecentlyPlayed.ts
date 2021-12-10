import axios from 'axios';
import getAccessToken from './getAccessToken';
import { CURRENT_USER_RECENTLY_PLAYED_URL } from '../constants';

/**
 * Get tracks from the current user’s recently played tracks. Note: Currently doesn’t support podcast episodes.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recently-played}
 * @param {number} [limit] - The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} [before] - A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position. If before is specified, after must not be specified.
 * @return {Promise} contains an array of play history objects (wrapped in a cursor-based paging object) in JSON format
 */
const fetchCurrentUsersRecentlyPlayed = async (limit = 20): Promise<any> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get(CURRENT_USER_RECENTLY_PLAYED_URL, {
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

      if (data?.items.length) {
        const { items, href, next } = data;
        return {
          items,
          href,
          next,
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

export default fetchCurrentUsersRecentlyPlayed;
