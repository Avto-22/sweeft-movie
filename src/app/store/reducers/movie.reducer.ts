import { createReducer, on, State } from "@ngrx/store";
import { MovieActions, MovieApiActions } from "../actions";
import { MovieState } from "../state";

const initialState: MovieState={
    mostWatcedMovies: [],
    favMovies: [],
    movieDetail: {},
    isMostWatchedMoviesPage:false,
    isFavMoviesPage:false,
    isFavMovie:false,
    isNotFavMovie:false,
    error:''
}

export const movieReducer = createReducer(
    initialState,

    // -------------------------------------------------
    on(MovieActions.getMostWatchedMovies, (state)=>{
        return {
            ...state,
        }
    }),

    on(MovieApiActions.getMostWatchedMoviesSuccessful, (state, {movieResult})=>{
        return {
            ...state,
            mostWatcedMovies: movieResult,
            loading: false
        }
    }),

    on(MovieApiActions.getMostWatchedMoviesFailed, (state, {error})=>{
        return {
            ...state, 
            error
        }
    }),  // -----------------------------------------------------




    // -----------------------------------------
    on(MovieActions.getMovieDetals, (state)=>{
        return {
            ...state,
        }
    }),

    on(MovieApiActions.getMovieDetalsSuccessful, (state, {movie})=>{
        return {
            ...state,
            movieDetail: movie
        }
    }),

    on(MovieApiActions.getMovieDetalsFailed, (state, {error})=>{
        return {
            ...state,
           error,
        }
    }), // ----------------------------------------


// -----------------------------------
    on(MovieActions.addFavMovie, (state, {movie, uid})=>{
        localStorage.setItem(`favmovies_${uid}`, JSON.stringify(movie));
        return {
            ...state,
            favMovies: [movie, ...state.favMovies]
        };
    }),

    on(MovieActions.removeFavMovie, (state, {key, movieId})=>{
        return {
            ...state,
            favMovies: state.favMovies.filter(movie=> movie.id != movieId)
        }
    }),

    on(MovieActions.getFavMovies, (state, {key})=>{
        return {
            ...state,
            favMovies: JSON.parse(localStorage.getItem(key)) || '[]'
        }
    }), // ----------------------



//  --------------------------------------------
    on(MovieActions.redirectToMostWatchedMoviesPage, (state)=>{
        return {
            ...state,
            isMostWatchedMoviesPage: true,
            isFavMoviesPage:false
        }
    }),


    on(MovieActions.redirectToFavMoviesPage, (state)=>{
        return {
            ...state,
            isMostWatchedMoviesPage: false,
            isFavMoviesPage:true
        }
    })
)