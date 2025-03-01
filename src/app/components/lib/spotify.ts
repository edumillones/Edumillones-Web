const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

const getAccessToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const getNowPlaying = async () => {
  const access_token = await getAccessToken();
  
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const access_token = await getAccessToken();
  
  return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPlaylists = async () => {
  const access_token = await getAccessToken();
  
  return fetch(`${PLAYLISTS_ENDPOINT}?limit=6`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

