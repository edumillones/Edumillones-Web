import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  // Use the exact production URL
  const redirect_uri = 'https://edumillones.vercel.app/api/spotify/callback'
  
  const scope = 'user-read-currently-playing user-top-read'
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id!,
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: 'true'
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}

