import { createAction, props } from "@ngrx/store";
import { ActorAndPhilmography, CollectionApiResponse, Genre, MovieDetail, MovieResult, SideBarCollectionDisplay } from "src/app/movie/movie-model";

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



// ---------------------------- Start Genres
export const getGenresSuccessful =  createAction(
    '[header] get Genres successful',
    props<{genres: Genre[]}>()
);

export const getGenresFailed =  createAction(
    '[header] get Genres failed',
    props<{error: string}>()
); // ------------------------------------ End Genres



// ---------------------------------------- Start searched Movies
export const getSearchedMoviesSuccessful =  createAction(
    '[header] get searched Movies successful',
    props<{searchResult: MovieResult[]}>()
);

export const getSearchedMoviesFailed =  createAction(
    '[header] get searched Movies failed'
); // ------------------------------------- End searched Movies



// -------------- Start Slider Collection
export const getSideBarCollectionSuccessful = createAction(
'[] get Collection successful',
props<{collections: SideBarCollectionDisplay[]}>()
);

export const getSideBarCollectionFailed = createAction(
    '[] get Collection failed',
    props<{error: string}>()
);  // -------------- End Slider Collection


// -------------------- Start Collection Detail
export const getCollectionDetailSuccessful = createAction(
    '[collection-details] get colection successful',
    props<{collection: CollectionApiResponse}>()
);

export const getCollectionDetailFailed = createAction(
    '[collection-details] get colection successful',
    props<{error: string}>()
); // ----------------------- End Collection Detail


// ---------------------------- Start Actor's info
export const getActorInfoSuccessful = createAction(
    '[Actor] get Actors info successful',
    props<{actor: ActorAndPhilmography}>()
);

export const getActorInfoFailed = createAction(
    '[Actor] get Actors info failed',
    props<{error: string}>()
); // ---------------------- End Actor's info