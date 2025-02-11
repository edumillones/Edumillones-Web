import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify-auth'

export async function GET() {
  try {
    const access_token = await getAccessToken()
    const allPlaylists = []
    let nextUrl = 'https://api.spotify.com/v1/me/playlists?limit=50'

    while (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: 'no-store',
      })

      if (!response.ok) throw new Error('Error fetching playlists')
      
      const data = await response.json()
      allPlaylists.push(...data.items)
      nextUrl = data.next
    }

    const publicPlaylists = allPlaylists.filter(
      (playlist: any) => playlist.public && playlist.images.length > 0
    )

    return NextResponse.json({ items: publicPlaylists })
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error interno' },
      { status: 500 }
    )
  }
}
