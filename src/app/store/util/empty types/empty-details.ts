import { MovieDetail } from "src/app/movie/movie-model";

export const EMPTY_MOVIE_DETAILS: MovieDetail = {
    backdrop_path: '',
    budget: NaN,
    genres: [
      {
        id: NaN,
        name: '',
      },
    ],
    id: NaN,
    imdb_id: '',
    original_title: '',
    overview: '',
    popularity: NaN,
    poster_path: '',
    release_date: '',
    runtime: NaN,
    spoken_languages: [{ english_name: '' }],
    status: '',
    title: '',
    vote_average: NaN,
    isFavorite: false,
    casts: [{ character: '', name: '', profile_path: '', id:NaN, cast_id: NaN, credit_id: '' }],
    trailer_url: '',
  };