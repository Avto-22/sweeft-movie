import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { MovieDetail, MovieResult } from 'src/app/movie/movie-model';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';
import { Store } from '@ngrx/store';
import { EMPTY_MOVIE_DETAILS } from '../empty types';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsFn {

  isMovieNotFound: boolean = false;

  errorText: string = '';

  constructor(private movieApi: MovieApiService, private store: Store) {}

  getFullInfo$(id?: number, userUid?: string): Observable<MovieDetail> {
    let favMovies: MovieResult[] = JSON.parse(
      localStorage.getItem(`favmovies_${userUid}`) || '[]'
    );
    return this.movieApi.getMovieById(id).pipe(
      map((movie) => {
        /* api-დან წამოღებული ფილმების შემოწმება არის თუ არა რომელიმე  უკვე მომხმარებლის მიერ ფავორიტი, და თუ არის დაამატებს ობიექტს შესაბამის პროპერთის true მნიშვნელობით,
                რასაც გამოვიყენებ შემდეგ დეტალების გვედზე ფავორიტების დამატების და წაშლის ღილაკების გამოსაჩენად*/
        for (let i = 0; i < favMovies.length; i++) {
          if (movie.id == favMovies[i]?.id) {
            movie = {
              ...movie,
              isFavorite: true,
            };
          }
        }
        return movie;
      }),
      mergeMap((movie) => {
        // ახალ observable-ზე გადაყვანა 
        return this.movieApi.getMovieCast(movie.id).pipe(
          catchError(() =>
            of({
              cast: [],
            })
          ),
          mergeMap((cast) => {
            return this.movieApi.getMovieTrailer(movie.id).pipe(
              catchError(() =>
                of({
                  results: [],
                })
              ),
              mergeMap((trailer_response) => {
                return of({
                  ...movie,
                  casts: cast.cast.filter((data) => data.profile_path),
                  trailer_url: trailer_response.results.length
                    ? 'https://www.youtube.com/embed/' +
                      trailer_response.results[0].key
                    : '',
                });
              })
            );
          })
        );
      }),
      catchError(() => {
        return of({
          ...EMPTY_MOVIE_DETAILS,
          isMovieNotFound:true
        });
      })
    );
  }
}
