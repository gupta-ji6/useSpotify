import axios from 'axios';
import getAccessToken from './getAccessToken';
import { NOW_PLAYING_URL } from '../constants';

/**
 * Get the object currently being played on the user’s Spotify account.
 *
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track}
 * @return {Promise}  A successful request will return a 200 OK response code with a json payload that contains information about the currently playing track or episode and its context.
 */
const fetchCurrentTrack = async (): Promise<
  | {
      album: any;
      artists: any;
      external_urls: any;
      name: any;
      preview_url: any;
    }
  | undefined
> => {
  try {
    const access_token = await getAccessToken();

    const response = await axios.get(NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.status === 200) {
      const data = response.data;

      if (data?.currently_playing_type === 'track' && data?.item !== null) {
        const { album, artists, external_urls, name, preview_url } = data?.item;

        return {
          album,
          artists,
          external_urls,
          name,
          preview_url,
        };
      } else if (data?.currently_playing_type === 'episode' && data?.item !== null) {
        // TODO: the item is always null in the response as of now.
        return undefined;
      }
    }
  } catch (error: any) {
    console.error(error?.response?.status);
    console.error(error?.response?.data);
  }

  return undefined;
};

export default fetchCurrentTrack;
