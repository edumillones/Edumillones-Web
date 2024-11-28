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

