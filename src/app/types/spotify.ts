export type Track = {
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

export type Playlist = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: {
    spotify: string;
  };
  public: boolean;
};

export type SpotifyError = {
  error: {
    status: number;
    message: string;
  };
};

