import axios from 'axios';
import getAccessToken from './getAccessToken';
import { CURRENT_USER_TOP_ARTISTS_TRACKS_URL } from '../constants';

type Type = 'artists' | 'tracks';
type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export interface FetchCurrentUsersTopArtistsOrTracksArgs {
  type: Type;
  limit: number;
  time_range: TimeRange;
}

/**
 * Get the current user’s top artists or tracks based on calculated affinity.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks}
 * @param {string} type - The type of entity to return. Valid values: artists or tracks.
 * @param {string} time_range - Over what time frame the affinities are computed. Valid values: long_term (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term
 * @param {number} limit - The number of entities to return. Default: 20. Minimum: 1. Maximum: 50.
 * @return {Promise} contains a paging object of Artists or Tracks.
 */
const fetchCurrentUsersTopArtistsOrTracks = async ({
  limit = 20,
  type = 'tracks',
  time_range = 'short_term',
}: FetchCurrentUsersTopArtistsOrTracksArgs): Promise<any> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get(
      `${CURRENT_USER_TOP_ARTISTS_TRACKS_URL}/${type}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        params: {
          time_range,
          limit,
        },
      },
    );

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

export default fetchCurrentUsersTopArtistsOrTracks;
