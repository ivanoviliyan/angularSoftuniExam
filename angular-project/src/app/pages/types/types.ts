export interface Movie {
  body: Movie[];
  _id: string;
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
  rating?: number;
  desc: string;
  watched: string[];
  isWatched: boolean;
  _ownerId: string;
  _movieId: string;
}

export interface FormData {
  id: string;
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
  desc: string;
  watched: [];
}

export interface User {
  username: string;
  accessToken: string;
  _id: string;
}

export interface WatchListEntry {
  id: string;
  image: string;
  title: string;
  director: string;
}
