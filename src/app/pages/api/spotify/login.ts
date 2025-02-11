import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
  const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

  if (!CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).json({ error: 'Configuración de Spotify incompleta' })
  }

  const scope = 'user-read-currently-playing user-top-read playlist-read-public'
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}
