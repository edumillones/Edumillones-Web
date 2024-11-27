import { NextApiRequest, NextApiResponse } from 'next'

// Environment variables are handled securely through Vercel
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/callback`
  : 'http://localhost:3000/api/callback'

export async function getAuthUrl() {
  if (!CLIENT_ID) {
    throw new Error('Missing Spotify client configuration')
  }

  const scope = 'user-read-currently-playing user-top-read'
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

