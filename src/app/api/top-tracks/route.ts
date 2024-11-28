import { NextResponse } from 'next/server'

const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
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

    const response = await fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=5`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch top tracks')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

