import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs';
import { EventBusService } from 'src/app/services/event-bus.service';
import { MovieBody, MovieResult } from '../../../movie-model';
import { MovieApiService } from '../../../services/movie-api.service';

@Injectable({
  providedIn: 'root'
})
export class MostWatchedFacadeService {
  page: number = 1;

  get mostWatchedMovies$(){
    return this.route.queryParams
      .pipe(
        switchMap((params) => {
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
        catchError((error)=>{
          this.router.navigate([error]);
          throw '';
        })
      )
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieApi: MovieApiService,
    private eventBusService: EventBusService,
  ) { }

}
