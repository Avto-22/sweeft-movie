import { createAction, props } from "@ngrx/store";

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
    props<{uid:string}>()
)

export const removeFavMovie = createAction(
    '[Movie Details] remove favMovie',
    props<{uid:string}>()
);

export const clearAllState = createAction(
    'clear all state'
);

export const getGenres = createAction(
    '[header] get Genres'
);

export const getSearchedMovies = createAction(
    '[header] get searched Movies',
    props<{movieName:string}>()
);

export const clearSearchedMovies = createAction(
    '[header] clear searched movies'
);