const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = `https://${process.env.VERCEL_URL}/api/spotify/callback`

export default function handler(req, res) {
  const scope = 'user-read-currently-playing user-top-read'
  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    }).toString())
}

 