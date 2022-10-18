import { createAction, props } from "@ngrx/store";
import { MovieDetail } from "src/app/movie/movie-model";

export const getMostWatchedMovies = createAction(
    '[Most_Watched] get movies',
);

export const getMovieDetals = createAction(
    "[Movie Details] get movie's detail",
    props<{id:number, uid:string}>()
);

export const getFavMovies = createAction(
    '[Fav Movies] get fav_movies',
    props<{key:string}>()
);

export const addFavMovie = createAction(
    '[Movie Details] add favMovie',
    props<{movie: MovieDetail, uid:string}>()
)

export const removeFavMovie = createAction(
    '[Movie Details] remove favMovie',
    props<{movieId:number}>()
);

export const redirectToMostWatchedMoviesPage = createAction(
    '[] redirect to MostWatchedPage'
);

export const redirectToFavMoviesPage = createAction(
    '[] redirect to FavMovies'
);