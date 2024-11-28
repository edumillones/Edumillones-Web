import { NextResponse } from 'next/server'

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  })

  const data = await response.json()
  return data.access_token
}

export async function GET() {
  try {
    const access_token = await getAccessToken()
    console.log('Access token obtenido:', !!access_token)

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    })
    
    console.log('Status de la respuesta:', response.status)

    if (response.status === 204) {
      console.log('No hay música reproduciéndose')
      return NextResponse.json({ isPlaying: false })
    }

    const data = await response.json()
    console.log('Datos recibidos:', data)

    if (data.error) {
      console.error('Error en la respuesta:', data.error)
      return NextResponse.json({ error: data.error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error completo:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

