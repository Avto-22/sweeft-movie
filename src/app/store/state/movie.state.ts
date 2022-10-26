import { CollectionApiResponse, Genre, MovieDetail, MovieResult, SideBarCollectionDisplay } from "src/app/movie/movie-model";

export interface MovieState {
    mostWatcedMovies: MovieResult[];
    favMovies: MovieDetail[];
    movieDetail: MovieDetail;
    collection: CollectionApiResponse;
    SidebarCollections: SideBarCollectionDisplay[];
    isMostWatchedMoviesPage:boolean;
    isFavMoviesPage:boolean;
    isFavMovie:boolean;
    isMovieNotFound:boolean;
    MovieNotFoundText:string;
    error:string;
    loading:boolean;
    page:number;
    genres: Genre[];
    isSearchedMovieFinded: boolean;
    findedMovies: MovieResult[];
}