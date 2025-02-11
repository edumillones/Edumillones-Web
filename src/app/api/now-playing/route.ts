import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify-auth'

export async function GET() {
  try {
    const access_token = await getAccessToken()
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    })

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false })
    }

    const data = await response.json()
    return NextResponse.json({ isPlaying: true, ...data })
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error interno' },
      { status: 500 }
    )
  }
}
