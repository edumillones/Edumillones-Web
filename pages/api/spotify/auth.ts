import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const scope = 'user-read-currently-playing user-top-read'
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const redirect_uri = `${process.env.VERCEL_URL}/api/spotify/callback`

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id!,
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: 'true'
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}

