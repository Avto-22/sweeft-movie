import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';
import { MovieActions, MovieApiActions } from '../actions';
import { MostWatchedMoviesFn } from '../util';
import { MovieDetailsFn } from '../util/movie-api-functions/movie-details.fn';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private mostWatchedMoviesFn: MostWatchedMoviesFn,
    private movieDetailsFn: MovieDetailsFn,
    private router: Router
  ) {}

  getMostWatchedMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getMostWatchedMovies),
      mergeMap(() => {
        return this.mostWatchedMoviesFn.mostWatchedMovies$.pipe(
          map((movies) => {
            return MovieApiActions.getMostWatchedMoviesSuccessful({
              movieResult: movies,
              page: this.mostWatchedMoviesFn.page
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.router.navigate([error]);
            return of(
              MovieApiActions.getMostWatchedMoviesFailed({
                error: `Failed to get MostWatchedMovies!: Server responded witch: ${error}`,
              })
            );
          })
        );
      })
    );
  });

  getMovieDetail$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(MovieActions.getMovieDetals),
          mergeMap(({id, uid}) => {
              return this.movieDetailsFn.getFullInfo$(id, uid)
          }),
          map(movie => {
            return MovieApiActions.getMovieDetalsSuccessful({movie})
          }),
          catchError((error:HttpErrorResponse) =>{
            return of(MovieApiActions.getMovieDetalsFailed({               
                error: `Failed to get MostWatchedMovies!: Server responded witch: ${error}`
            }))
          })
      )
  })
}
