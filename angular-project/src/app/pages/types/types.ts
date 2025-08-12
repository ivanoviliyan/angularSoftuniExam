export interface Movie {
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