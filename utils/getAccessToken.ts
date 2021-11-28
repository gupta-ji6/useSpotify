import axios from 'axios';

/**
 * Get OAuth access token from Spotify Web API
 *
 * @see {@link https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow}
 */
const getAccessToken = async () => {
  let access_token = '';

  if ('REFRESH_TOKEN_ENDPOINT' in process.env === false) {
    throw new Error(
      `'REFRESH_TOKEN_ENDPOINT' key is not defined in environment variables`
    );
  }
  if ('SPOTIFY_REFRESH_TOKEN' in process.env === false) {
    throw new Error(
      `'SPOTIFY_REFRESH_TOKEN' key is not defined in environment variables`
    );
  }

  try {
    const response = await axios.post(process.env.REFRESH_TOKEN_ENDPOINT, {
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    });
    access_token = response.data?.access_token;
  } catch (error) {
    if (error?.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error?.response?.data);
      console.log(error?.response?.status);
      console.log(error.response.headers);
    } else if (error?.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error?.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error?.message);
    }
  }

  return access_token;
};

export default { getAccessToken };
