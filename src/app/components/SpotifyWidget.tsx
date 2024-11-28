import React, { useState, useEffect } from 'react';
import { getNowPlaying, getTopTracks } from './lib/spotify';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album?: { images: { url: string }[] };
}

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    async function fetchData() {
      const nowPlayingResponse = await getNowPlaying();
      if (nowPlayingResponse.status === 200) {
        const nowPlayingData = await nowPlayingResponse.json();
        setNowPlaying(nowPlayingData.item);
      }

      const topTracksResponse = await getTopTracks();
      if (topTracksResponse.status === 200) {
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData.items);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Spotify</h2>
      {nowPlaying && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Now Playing</h3>
          <div className="flex items-center">
            {nowPlaying.album?.images[0] && (
              <img src={nowPlaying.album.images[0].url} alt={nowPlaying.name} className="w-16 h-16 mr-4" />
            )}
            <div>
              <p className="font-medium">{nowPlaying.name}</p>
              <p className="text-gray-400">{nowPlaying.artists[0].name}</p>
            </div>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">Top Tracks</h3>
        <ul className="space-y-2">
          {topTracks.map((track) => (
            <li key={track.id} className="flex items-center">
              {track.album?.images[0] && (
                <img src={track.album.images[0].url} alt={track.name} className="w-10 h-10 mr-3" />
              )}
              <div>
                <p className="font-medium">{track.name}</p>
                <p className="text-gray-400 text-sm">{track.artists[0].name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

