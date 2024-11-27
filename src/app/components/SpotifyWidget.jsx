"use client";

import React, { useState, useEffect } from 'react';
import { getNowPlaying, getTopTracks } from '../../lib/spotify';

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const nowPlayingResponse = await getNowPlaying();
      if (nowPlayingResponse.status === 200) {
        const nowPlayingData = await nowPlayingResponse.json();
        setNowPlaying(nowPlayingData);
      }

      const topTracksResponse = await getTopTracks();
      if (topTracksResponse.status === 200) {
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData.items);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="spotify-widget">
      <h2>My Spotify</h2>
      {nowPlaying && (
        <div className="now-playing">
          <h3>Now Playing</h3>
          <p>{nowPlaying.item.name} - {nowPlaying.item.artists[0].name}</p>
        </div>
      )}
      <div className="top-tracks">
        <h3>Top Tracks</h3>
        <ul>
          {topTracks.map((track) => (
            <li key={track.id}>{track.name} - {track.artists[0].name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

