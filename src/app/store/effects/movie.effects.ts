import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MovieActions, MovieApiActions } from '../actions';
import { GenresClass, MostWatchedMoviesFn } from '../util';
import { MovieDetailsFn } from '../util/movie-api-functions/movie-details.fn';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private mostWatchedMoviesFn: MostWatchedMoviesFn,
    private movieDetailsFn: MovieDetailsFn,
    private genresClass: GenresClass,
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
              page: this.mostWatchedMoviesFn.page,
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
      mergeMap(({ id, uid }) => {
        return this.movieDetailsFn.getFullInfo$(id, uid);
      }),
      map((movie) => {
        if (movie.isMovieNotFound) {
          return MovieApiActions.getMovieDetalsFailed({
            error: 'movie not found',
          });
        }
        return MovieApiActions.getMovieDetalsSuccessful({ movie });
      })
    );
  });

  getGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getGenres),
      mergeMap(() => {
        return this.genresClass.getGenres();
      }),
      map((genres) => {
        return MovieApiActions.getGenresSuccessful({ genres });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(
          MovieApiActions.getGenresFailed({
            error: `Failed to get Genres!: Server responded witch: ${error}`,
          })
        );
      })
    );
  });
}
