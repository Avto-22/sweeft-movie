import { createAction, props } from "@ngrx/store";
import { Genre, MovieDetail, MovieResult } from "src/app/movie/movie-model";

// ------------ Start Most watched Movies
export const getMostWatchedMoviesSuccessful = createAction(
    '[Most_Watched] get movies successful',
    props<{movieResult:MovieResult[], page:number}>()
);

export const getMostWatchedMoviesFailed = createAction(
    '[Most_Watched] get movies failed',
    props<{error:string}>()
);
//  -------------- End Most watched Movies



// ---------------- Start Movie's detail
export const getMovieDetalsSuccessful = createAction(
    "[Movie Details] get movie's detail successful",
    props<{movie:MovieDetail}>()
);

export const getMovieDetalsFailed = createAction(
    "[Movie Details] get movie's detail failed",
    props<{error:string}>()
);
// ---------------- End Movie's detail


export const getGenresSuccessful =  createAction(
    '[header] get Genres successful',
    props<{genres: Genre[]}>()
);

export const getGenresFailed =  createAction(
    '[header] get Genres failed',
    props<{error: string}>()
);