import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MovieActions, MovieApiActions } from '../actions';
import {
  CollectionDetail,
  GenresClass,
  MostWatchedMoviesFn,
  SearchedMovies,
  SidebarCollections,
} from '../util';
import { Actor } from '../util/movie-api-functions/actor.fn';
import { MovieDetailsFn } from '../util/movie-api-functions/movie-details.fn';

const COLLECTIONS_ID: number[] = [
  945, 937, 748, 735, 656, 645, 556, 529, 528, 495, 456, 432, 420, 399, 328,
  304, 295, 264, 263, 230, 151, 131, 119, 84, 10,
];

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private mostWatchedMoviesFn: MostWatchedMoviesFn,
    private movieDetailsFn: MovieDetailsFn,
    private genresClass: GenresClass,
    private router: Router,
    private sarchedMovies: SearchedMovies,
    private sidebarCollections: SidebarCollections,
    private collectionDetail: CollectionDetail,
    private actor: Actor
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

  getSearchedMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getSearchedMovies),
      mergeMap(({ movieName }) => {
        return this.sarchedMovies.search(movieName);
      }),
      map((movies) => {
        return MovieApiActions.getSearchedMoviesSuccessful({
          searchResult: movies,
        });
      }),
      catchError(() => {
        return of(MovieApiActions.getSearchedMoviesFailed());
      })
    );
  });

  getCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getSideBarCollection),
      mergeMap(() => {
        return this.sidebarCollections.getSideBarCollection(COLLECTIONS_ID);
      }),
      map((collections) => {
        return MovieApiActions.getSideBarCollectionSuccessful({ collections });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(
          MovieApiActions.getSideBarCollectionFailed({
            error: `Failed to get Genres!: Server responded witch: ${error}`,
          })
        );
      })
    );
  });

  getCollectionDetail = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getCollectionDetail),
      mergeMap(({ collectionId }) => {
        return this.collectionDetail.getCollectionDetail(collectionId);
      }),
      map((collection) => {
        return MovieApiActions.getCollectionDetailSuccessful({ collection });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(
          MovieApiActions.getCollectionDetailFailed({
            error: `Failed to get Genres!: Server responded witch: ${error}`,
          })
        );
      })
    );
  });

  getActor = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getActorInfo),
      mergeMap(({ personId }) => {
        return this.actor.getActorInfo(personId);
      }),
      map((actor) => {
        return MovieApiActions.getActorInfoSuccessful({ actor });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(
          MovieApiActions.getActorInfoFailed({
            error: `Failed to get Genres!: Server responded witch: ${error}`,
          })
        );
      })
    );
  });
}
