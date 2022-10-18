import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Movie, MovieDetail, MovieResult } from 'src/app/movie/movie-model';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsFn {
  isFavourite: boolean;

  isMovieNotFound: boolean;

  errorText: string;

  favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  constructor(private movieApi: MovieApiService) {}

  getFullInfo$(id?: number, userUid?: string): Observable<MovieDetail> {
    if (id && userUid) {
      let favMovies: MovieResult[] = JSON.parse(
        localStorage.getItem(`favorites_${userUid}`) || '[]'
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
          // ახალ observable-ზე გადაყვანა და MovieAndCast ტიპის გამოყვანა
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
        tap((movie) => {
          this.isFavourite = Boolean(movie.isFavorite);
        }),
        catchError(() => {
          this.isMovieNotFound = true;
          this.errorText = 'movie not found';
          throw '';
        })
      );
    } else {
        let ret: MovieDetail={
            backdrop_path: '',
            budget: 0,
            genres: [
              {
                id: 0,
                name: '',
              },
            ],
            id: 0,
            imdb_id: '',
            original_title: '',
            overview: '',
            popularity: 0,
            poster_path: '',
            release_date: '',
            runtime: 0,
            spoken_languages: [{ english_name: '' }],
            status: '',
            title: '',
            vote_average: 0,
            isFavorite: false,
            casts: [{ character: '', name: '', profile_path: '' }],
            trailer_url: '',
        }
      return of(ret);
    }
  }
}
