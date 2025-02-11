import { NextResponse } from 'next/server'

export const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const getAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Faltan variables de entorno de Spotify')
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status} al renovar token`)
  }

  const data = await response.json()
  return data.access_token
}

export async function GET() {
  try {
    const access_token = await getAccessToken()
    
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
      cache: 'no-store',
    })

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false })
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error ${response.status} del servidor de Spotify` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ isPlaying: true, ...data })

  } catch (error: any) {
    console.error('Error completo:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
