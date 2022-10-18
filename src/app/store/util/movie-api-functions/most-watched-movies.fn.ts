import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap, tap } from "rxjs";
import { MovieBody, MovieResult } from "src/app/movie/movie-model";
import { MovieApiService } from "src/app/movie/services/movie-api.service";
import { EventBusService } from "src/app/services/event-bus.service";

@Injectable({
  providedIn: 'root'
})
export class MostWatchedMoviesFn{

    page: number = 1;

    get mostWatchedMovies$(){
      return this.route.queryParams
        .pipe(
          mergeMap((params) => {
            if (params['page']) {
              if (
                parseInt(params['page']) > 200 ||
                !parseInt(params['page'].split('').reverse().join(''))
              ) {
                throw 'page-not-found';
              } else {
                this.page = params['page'];
                return this.movieApi.getMovieListByPageName(this.page).pipe(
                  map<MovieBody, MovieResult[]>(movieData=>{
                    return movieData.results.filter(
                      (movie) => movie.poster_path && movie.overview && movie.title
                    );
                  }),
                 );
              }
            }
            return this.movieApi.getMovieListByPageName(this.page).pipe(
              map<MovieBody, MovieResult[]>(movieData=>{
                return movieData.results.filter(
                  (movie) => movie.poster_path && movie.overview && movie.title
                );
              }),
            );
          }),
          tap(()=>{
            this.eventBusService.setPage(this.page);
          }),
        //   catchError((error: HttpErrorResponse)=>{
        //     this.router.navigate([error]);
        //     return of(MovieApiActions.getMostWatchedMoviesFailed({error: `Failed to get MostWatchedMovies!: Server responded witch: ${error}`}))
        //   })
        )
    }
  
    constructor(
      private route: ActivatedRoute,
      private movieApi: MovieApiService,
      private eventBusService: EventBusService,
    ) { }

}