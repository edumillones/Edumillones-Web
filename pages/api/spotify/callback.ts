import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  // Use the exact same redirect URI as in auth.ts
  const redirect_uri = 'https://edumillones.vercel.app/api/spotify/callback'
  
  const code = req.query.code

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code' })
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
      res.setHeader('Content-Type', 'text/html')
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Spotify Refresh Token</title>
            <style>
              body {
                font-family: system-ui, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
              }
              .token {
                background: #f1f1f1;
                padding: 20px;
                border-radius: 4px;
                word-break: break-all;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h1>🎉 ¡Autenticación Exitosa!</h1>
            <p>Tu refresh token es:</p>
            <div class="token">
              <code>${data.refresh_token}</code>
            </div>
            <p>Guarda este token en tus variables de entorno de Vercel como SPOTIFY_REFRESH_TOKEN</p>
          </body>
        </html>
      `)
    } else {
      res.status(response.status).json(data)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error during authentication' })
  }
}

