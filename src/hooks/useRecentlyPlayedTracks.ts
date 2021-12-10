import { useEffect, useState } from 'react';
import uniqBy from 'lodash/uniqBy';
import { fetchCurrentUsersRecentlyPlayed } from '../utils';

/**
 * Custom react hook to get tracks from the current user’s recently played tracks. Note: Currently doesn’t support podcast episodes.
 * @see {@link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recently-played}
 *
 * @param {number} [limit=20] The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
 * @return {Object} an object containing tracks, loading, error, refetch
 */
function useRecentlyPlayedTracks(limit = 20) {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [recentTracksError, setRecentTracksError] = useState<null | string>(null);
  const [recentTracksLoading, setRecentTracksLoading] = useState<boolean>(false);

  async function fetchData() {
    setRecentTracksLoading(true);
    const tracks = await fetchCurrentUsersRecentlyPlayed(limit);
    if (tracks !== undefined) {
      const uniqueRecentTracks = uniqBy(tracks?.items, function (e) {
        // @ts-ignore
        return e.track.id;
      });
      // @ts-ignore
      setRecentlyPlayedTracks(uniqueRecentTracks);
      setRecentTracksLoading(false);
      setRecentTracksError(null);
    } else {
      setRecentlyPlayedTracks([]);
      setRecentTracksLoading(false);
      setRecentTracksError(`Couldn't fetch recently played tracks.`);
    }
  }

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      fetchData();
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  return {
    recentlyPlayedTracks,
    recentTracksError,
    recentTracksLoading,
    refetchRecentTracks: fetchData,
  };
}

export default useRecentlyPlayedTracks;
