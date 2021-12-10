import axios from 'axios';
import getAccessToken from './getAccessToken';
import { CURRENT_USER_PROFILE_URL } from '../constants';

/**
 * Get detailed profile information about the current user (including the current user’s username).
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile}
 * @return {Promise} contains a user object in JSON format.
 */
const fetchCurrentUserProfile = async (): Promise<any> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get(CURRENT_USER_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = response.data;

      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export default fetchCurrentUserProfile;
