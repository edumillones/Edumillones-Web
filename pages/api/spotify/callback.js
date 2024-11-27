import axios from 'axios'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = `https://${process.env.VERCEL_URL}/api/spotify/callback`

export default async function handler(req, res) {
  const code = req.query.code
 
  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Code must be a string' });
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.status === 200) {
      const { refresh_token } = response.data
      res.status(200).json({ refresh_token })
    } else {
      res.status(response.status).json({ error: 'Error during authentication' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error during authentication' })
  }
}

