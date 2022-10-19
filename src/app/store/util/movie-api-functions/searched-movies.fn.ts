import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { MovieBody, MovieResult } from 'src/app/movie/movie-model';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchedMovies {
  constructor(private movieApiService: MovieApiService) {}

  search(movieName: string): Observable<MovieResult[]> {
    if (movieName) {
      return this.movieApiService.searchMovieByName(movieName).pipe(
        mergeMap((data) => {
          if (
            data.results.filter(
              (movie) => movie.poster_path && movie.overview && movie.title
            ).length
          ) {
            return of(
              data.results.filter(
                (movie) => movie.poster_path && movie.overview && movie.title
              )
            );
          }
          return of([]);
        })
      );
    } else {
      return of([]);
    }
  }
}
