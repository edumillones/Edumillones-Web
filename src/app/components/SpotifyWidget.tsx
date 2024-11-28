import React, { useState, useEffect } from 'react';
import { getNowPlaying, getTopTracks, getPlaylists } from './lib/spotify';
import { Music, Disc3, ListMusic } from 'lucide-react';

type Track = {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
};

type Playlist = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: {
    spotify: string;
  };
  public: boolean;
};

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [nowPlayingRes, topTracksRes, playlistsRes] = await Promise.all([
          getNowPlaying(),
          getTopTracks(),
          getPlaylists(),
        ]);

        if (nowPlayingRes.status === 200) {
          const data = await nowPlayingRes.json();
          setNowPlaying(data.item);
        }

        if (topTracksRes.status === 200) {
          const data = await topTracksRes.json();
          setTopTracks(data.items);
        }

        if (playlistsRes.status === 200) {
          const data = await playlistsRes.json();
          setPlaylists(data.items.filter((playlist: Playlist) => playlist.public));
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Mi Música en Tiempo Real
        </h2>
        <p className="text-purple-300 text-lg">
          Descubre lo que estoy escuchando y mis canciones favoritas 🎵
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Now Playing Section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Reproduciendo Ahora</h3>
            </div>
            {nowPlaying ? (
              <a
                href={nowPlaying.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center space-x-4 hover:bg-white/5 p-3 rounded-lg transition-all">
                  <img
                    src={nowPlaying.album.images[0].url}
                    alt={nowPlaying.name}
                    className="w-24 h-24 rounded-lg shadow-lg group-hover:shadow-purple-500/20"
                  />
                  <div>
                    <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                      {nowPlaying.name}
                    </p>
                    <p className="text-purple-300">{nowPlaying.artists[0].name}</p>
                  </div>
                </div>
              </a>
            ) : (
              <p className="text-purple-300 text-center py-8">No hay nada reproduciéndose ahora mismo</p>
            )}
          </div>

          {/* Top Tracks Section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Disc3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Top Canciones</h3>
            </div>
            <div className="space-y-3">
              {topTracks.map((track, index) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:bg-white/5 p-3 rounded-lg transition-all group"
                >
                  <span className="text-purple-400 font-medium w-6">{index + 1}</span>
                  <img
                    src={track.album.images[2].url}
                    alt={track.name}
                    className="w-12 h-12 rounded shadow-lg group-hover:shadow-purple-500/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-purple-400 transition-colors">
                      {track.name}
                    </p>
                    <p className="text-purple-300 text-sm truncate">{track.artists[0].name}</p>
                  </div>
                  <span className="text-purple-300 text-sm">
                    {formatDuration(track.duration_ms)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Public Playlists Section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <ListMusic className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Mis Playlists</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {playlists.map((playlist) => (
                <a
                  key={playlist.id}
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="space-y-2 hover:bg-white/5 p-3 rounded-lg transition-all">
                    <img
                      src={playlist.images[0]?.url}
                      alt={playlist.name}
                      className="w-full aspect-square rounded-lg shadow-lg object-cover group-hover:shadow-purple-500/20"
                    />
                    <p className="text-white font-medium truncate text-sm group-hover:text-purple-400 transition-colors">
                      {playlist.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

