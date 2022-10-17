import { MovieDetail, MovieResult } from "src/app/movie/movie-model";

export interface MovieState {
    mostWatcedMovies: MovieResult[];
    favMovies: MovieDetail[];
    movieDetail: MovieDetail | {};
    isMostWatchedMoviesPage:boolean;
    isFavMoviesPage:boolean;
    isFavMovie:boolean;
    isNotFavMovie:boolean;
    error:string;
}