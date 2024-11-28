"use client"

import React, { useState, useEffect } from 'react';
import { getNowPlaying, getTopTracks, getPlaylists } from './lib/spotify';

type Image = {
  url: string;
};

type Artist = {
  name: string;
};

type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images: Image[];
  };
  duration_ms: number;
};

type Playlist = {
  id: string;
  name: string;
  images: Image[];
  public: boolean;
};

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch currently playing
        const nowPlayingRes = await getNowPlaying();
        if (nowPlayingRes.status === 200) {
          const data = await nowPlayingRes.json();
          setNowPlaying(data.item);
        }

        // Fetch top tracks
        const topTracksRes = await getTopTracks();
        if (topTracksRes.status === 200) {
          const data = await topTracksRes.json();
          setTopTracks(data.items);
        }

        // Fetch playlists
        const playlistsRes = await getPlaylists();
        if (playlistsRes.status === 200) {
          const data = await playlistsRes.json();
          setPlaylists(data.items.filter((playlist: Playlist) => playlist.public));
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        My Spotify
      </h2>
      
      {/* Now Playing Section */}
      {nowPlaying && (
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-white">Now Playing</h3>
          <div className="flex items-center space-x-4">
            <img
              src={nowPlaying.album.images[0].url}
              alt={nowPlaying.name}
              className="w-24 h-24 rounded-lg shadow-lg"
            />
            <div>
              <p className="text-lg font-medium text-white">{nowPlaying.name}</p>
              <p className="text-purple-300">{nowPlaying.artists[0].name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Tracks Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-white">Top Tracks</h3>
        <div className="space-y-4">
          {topTracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center space-x-4 hover:bg-white/5 p-2 rounded-lg transition-colors"
            >
              <span className="text-purple-300 w-6">{index + 1}</span>
              <img
                src={track.album.images[2].url}
                alt={track.name}
                className="w-12 h-12 rounded shadow"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{track.name}</p>
                <p className="text-purple-300 text-sm">{track.artists[0].name}</p>
              </div>
              <span className="text-purple-300 text-sm">
                {formatDuration(track.duration_ms)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Public Playlists Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-white">Public Playlists</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group hover:bg-white/5 p-3 rounded-lg transition-colors"
            >
              <img
                src={playlist.images[0]?.url}
                alt={playlist.name}
                className="w-full aspect-square rounded-lg shadow-lg mb-2"
              />
              <p className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                {playlist.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

