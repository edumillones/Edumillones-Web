'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Music2Icon } from 'lucide-react'
import { Music } from 'lucide-react';

type NowPlayingTrack = {
  is_playing: boolean;
  item?: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
};

interface NowPlayingResponse {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const getNowPlaying = async () => {
    try {
      const res = await fetch('/api/spotify/now-playing');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res;
    } catch (error) {
      console.error("Error fetching now playing:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const getTopTracks = async () => {
    // Placeholder for fetching top tracks
    return Promise.resolve({ status: 200 });
  };

  const getPlaylists = async () => {
    // Placeholder for fetching playlists
    return Promise.resolve({ status: 200 });
  };


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
          setNowPlaying(data); 
        }

        if (topTracksRes.status !== 200) {
          setError('Error fetching top tracks data');
        }
        if (playlistsRes.status !== 200) {
          setError('Error fetching playlists data');
        }

      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setError('Error fetching Spotify data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Reproduciendo Ahora</h3>
        </div>
        {nowPlaying?.is_playing && nowPlaying.item ? (
          <a
            href={nowPlaying.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex items-center space-x-4 hover:bg-white/5 p-3 rounded-lg transition-all">
              <img
                src={nowPlaying.item.album.images[0].url}
                alt={nowPlaying.item.name}
                className="w-24 h-24 rounded-lg shadow-lg group-hover:shadow-purple-500/20"
              />
              <div>
                <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                  {nowPlaying.item.name}
                </p>
                <p className="text-purple-300">{nowPlaying.item.artists[0].name}</p>
              </div>
            </div>
          </a>
        ) : (
          <p className="text-purple-300 text-center py-8">No hay nada reproduciéndose ahora mismo</p>
        )}
      </div>
    </div>
  );
}

