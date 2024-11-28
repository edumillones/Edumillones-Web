import { NextResponse } from 'next/server'

// src/app/pages/api/spotify/now-playing.ts

export const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

export async function getAccessToken() {  // Asegúrate de exportar la función
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();  // Aquí ya puedes usar getAccessToken
    console.log('Access token obtenido:', !!access_token);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    console.log('Status de la respuesta:', response.status);

    if (response.status === 204) {
      console.log('No hay música reproduciéndose');
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);

    if (data.error) {
      console.error('Error en la respuesta:', data.error);
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
