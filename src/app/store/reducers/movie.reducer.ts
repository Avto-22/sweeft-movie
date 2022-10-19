import { createReducer, on } from '@ngrx/store';
import { Movie, MovieDetail } from 'src/app/movie/movie-model';
import { MovieActions, MovieApiActions } from '../actions';
import { MovieState } from '../state';
import { EMPTY_MOVIE_DETAILS } from '../util/empty types';

const initialState: MovieState = {
  mostWatcedMovies: [],
  favMovies: [],
  genres: [],
  isMostWatchedMoviesPage: false,
  isFavMoviesPage: false,
  isFavMovie: false,
  isMovieNotFound: false,
  MovieNotFoundText: '',
  error: '',
  loading: false,
  page: 1,
  movieDetail: EMPTY_MOVIE_DETAILS,
  isSearchedMovieFinded: true,
  findedMovies: [],
};

export const movieReducer = createReducer(
  initialState,

  // -------------------------------------------------
  on(MovieActions.getMostWatchedMovies, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(
    MovieApiActions.getMostWatchedMoviesSuccessful,
    (state, { movieResult, page }) => {
      return {
        ...state,
        mostWatcedMovies: movieResult,
        page,
        loading: false,
      };
    }
  ),

  on(MovieApiActions.getMostWatchedMoviesFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }), // -----------------------------------------------------

  // -----------------------------------------
  on(MovieActions.getMovieDetals, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(MovieApiActions.getMovieDetalsSuccessful, (state, { movie }) => {
    return {
      ...state,
      movieDetail: movie,
      loading: false,
      isFavMovie: movie.isFavorite,
      error: '',
      isMovieNotFound: false,
      MovieNotFoundText: '',
    };
  }),

  on(MovieApiActions.getMovieDetalsFailed, (state, { error }) => {
    return {
      ...state,
      movieDetail: EMPTY_MOVIE_DETAILS,
      loading: false,
      error,
      isMovieNotFound: true,
      MovieNotFoundText: 'movie not found',
    };
  }), // ----------------------------------------

  //   ------------------------------------------------
  on(MovieActions.getGenres, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(MovieApiActions.getGenresSuccessful, (state, { genres }) => {
    return {
      ...state,
      genres,
      loading: false,
    };
  }),

  on(MovieApiActions.getGenresFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }), //   --------------------------------------------

  // -----------------------------------
  on(MovieActions.addFavMovie, (state, { uid }) => {
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem(`favmovies_${uid}`)
    );

    localStorage.setItem(
      `favmovies_${uid}`,
      JSON.stringify([state.movieDetail, ...favorites])
    );

    return {
      ...state,
      favMovies: [state.movieDetail, ...state.favMovies],
      isFavMovie: true,
    };
  }),

  on(MovieActions.removeFavMovie, (state, { uid }) => {
    let favMovies: MovieDetail[] = JSON.parse(
      localStorage.getItem(`favmovies_${uid}`)
    ).filter((movie) => movie.id != state.movieDetail.id);
    localStorage.setItem(`favmovies_${uid}`, JSON.stringify(favMovies));
    return {
      ...state,
      favMovies,
      isFavMovie: false,
    };
  }),

  on(MovieActions.getFavMovies, (state, { key }) => {
    return {
      ...state,
      favMovies: JSON.parse(localStorage.getItem(key)),
    };
  }), // ----------------------


  // ----------------------------------
  on(MovieActions.getSearchedMovies, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(MovieApiActions.getSearchedMoviesSuccessful, (state, { searchResult }) => {
    return {
      ...state,
      loading: false,
      findedMovies: searchResult,
      isSearchedMovieFinded: true,
    };
  }),

  on(MovieApiActions.getSearchedMoviesFailed, (state) => {
    return {
      ...state,
      loading: false,
      findedMovies: [],
      isSearchedMovieFinded: false,
    };
  }),

  on(MovieActions.clearSearchedMovies, (state)=>{
    return {
        ...state,
        findedMovies: []
    }
  }), // ---------------------------



  //   ----------------------------
  on(MovieActions.clearAllState, (state) => {
    return {
      mostWatcedMovies: [],
      favMovies: [],
      genres: [],
      isMostWatchedMoviesPage: false,
      isFavMoviesPage: false,
      isFavMovie: false,
      isMovieNotFound: false,
      MovieNotFoundText: '',
      error: '',
      loading: false,
      page: 1,
      movieDetail: {
        ...EMPTY_MOVIE_DETAILS,
        isMovieNotFound: state.isMovieNotFound,
      },
      isSearchedMovieFinded: true,
      findedMovies: [],
    };
  })
);
