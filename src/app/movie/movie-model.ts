export interface MovieBody {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  backdrop_path: string;
  budget: number;
  genres?: Genre[];
  id: number;
  imdb_id: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  spoken_languages?: Language[];
  status: string;
  title: string;
  vote_average: number;
  isFavorite: boolean;
}

export type Genre = {
    id: number;
    name: string;
};

export interface Genres {
    genres: Genre[];
}

export type Language = {
  english_name: string;
};

export interface CastBody {
  cast: Cast[];
}

export interface Trailer{
  results: {key:string}[]
}

export interface Cast {
  character: string;
  name: string;
  profile_path: string;
}

export type MovieDetail = Movie & { casts?: Cast[], trailer_url:string, isMovieNotFound?:boolean };

export type MovieResultAndGenre = {
    movie_results: MovieResult[];
    genres: Genre[];
};

export interface SideBarCollectionDisplay {
  collectionId:number;
  poster:string;
  name:string;
  movie_count: number;
  backdrop_path:string;
};

export interface CollectionApiResponse {
  id:number;
  poster_path:string;
  name:string;
  parts: MovieResult[];
  backdrop_path:string;
};

export enum Month {
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
}
