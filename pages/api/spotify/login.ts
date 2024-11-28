import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
  const REDIRECT_URI = `https://designify-web-7aeb-myzziz8xs-designify.vercel.app/api/spotify/callback`

  if (!CLIENT_ID) {
    return res.status(500).json({ error: 'Missing Spotify client ID' })
  }

  const scope = 'user-read-currently-playing user-top-read'
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}

