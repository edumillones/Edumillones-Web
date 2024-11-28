import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  // Usa la URL completa de tu aplicación
  const redirect_uri = 'https://designify-web-7aeb-8kd1glt5b-designify.vercel.app/api/spotify/callback'
  
  const scope = 'user-read-currently-playing user-top-read'
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id!,
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: 'true'
  })

  // Redirige al usuario a la página de autorización de Spotify
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}

