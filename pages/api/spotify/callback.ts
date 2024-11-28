import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const redirect_uri = `${process.env.VERCEL_URL}/api/spotify/callback`

  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid code' })
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      res.status(200).json({ refresh_token: data.refresh_token })
    } else {
      res.status(response.status).json(data)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error during authentication' })
  }
}

