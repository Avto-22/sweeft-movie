import { MovieDetail } from "src/app/movie/movie-model";

export const EMPTY_MOVIE_DETAILS: MovieDetail = {
    backdrop_path: '',
    budget: 0,
    genres: [
      {
        id: 0,
        name: '',
      },
    ],
    id: 0,
    imdb_id: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    runtime: 0,
    spoken_languages: [{ english_name: '' }],
    status: '',
    title: '',
    vote_average: 0,
    isFavorite: false,
    casts: [{ character: '', name: '', profile_path: '' }],
    trailer_url: '',
  };