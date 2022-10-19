import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "../state";

export const selectMovie = createFeatureSelector<MovieState>('movies');

export const selectMostWatchedMovies = createSelector(
    selectMovie,
    (state: MovieState)=>state.mostWatcedMovies
);

export const selectFavMovies = createSelector(
    selectMovie,
    (state: MovieState)=> state.favMovies
);

export const selectMovieDetail = createSelector(
    selectMovie,
    (state: MovieState)=>state.movieDetail
);

export const selectIsMostWatchedMoviesPage = createSelector(
    selectMovie,
    (state: MovieState)=> state.isMostWatchedMoviesPage
);

export const selectIsFavMoviesPage = createSelector(
    selectMovie,
    (state: MovieState) => state.isFavMoviesPage
);

export const selectIsFavMovie = createSelector(
    selectMovie,
    (state: MovieState) => state.isFavMovie
);       

export const selectError = createSelector(
    selectMovie,
    (state: MovieState) => state.error
);

export const selectLoading = createSelector(
    selectMovie,
    (state: MovieState) => state.loading
);

export const selectPage = createSelector(
    selectMovie,
    (state: MovieState) => state.page
);

export const selectIsMovieNotFound = createSelector(
    selectMovie,
    (state: MovieState) => state.isMovieNotFound
);

export const selectMovieNotFoundText = createSelector(
    selectMovie,
    (state: MovieState) => state.MovieNotFoundText
);

export const selectGenres = createSelector(
    selectMovie,
    (state: MovieState) => state.genres
);

