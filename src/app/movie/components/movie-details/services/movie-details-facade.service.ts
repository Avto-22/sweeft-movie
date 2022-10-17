import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Movie, MovieDetail, MovieResult } from '../../../movie-model';
import { MovieApiService } from '../../../services/movie-api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsFacadeService {
  isFavourite: boolean;

  movie!: MovieDetail;

  isMovieNotFound: boolean;

  errorText: string;

  favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  constructor(
    private sweetAlert: SweetAlertService,
    private movieApi: MovieApiService,
    private authService:AuthService
  ) {}

  getFullInfo(id: number, userUid: string): Observable<MovieDetail> {
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
      switchMap((movie) => {
        // ახალ observable-ზე გადაყვანა და MovieAndCast ტიპის გამოყვანა
        return this.movieApi.getMovieCast(movie.id).pipe(
          catchError(() =>
            of({
              cast: [],
            })
          ),
          switchMap((cast) => {
            return this.movieApi.getMovieTrailer(movie.id).pipe(
              catchError(() =>
                of({
                  results: [],
                })
              ),
              switchMap((trailer_response) => {
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
        this.movie = movie;
        this.isFavourite = Boolean(movie.isFavorite);
      }),
      take(1),
      catchError(() => {
        this.isMovieNotFound = true;
        this.errorText = 'movie not found';
        throw '';
      })
    );
  }
  

  async addFavorite() { //---------------- start add favorite
    let userUid: string;
    await this.authService.getUserUid().then(res=>{
      userUid = res;
    });
    this.isFavourite = true;
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem(`favorites_${userUid}`) || '[]'
    );

    localStorage.setItem(
      `favorites_${userUid}`,
      JSON.stringify([this.movie, ...favorites])
    );
    this.sweetAlert.addFav('Film added Successful');
  } // ------------------ end add favorite


  async removeFavourite() { // ------------------ start removeFavorite
    let userUid: string;
    await this.authService.getUserUid().then(res=>{
      userUid = res;
    });
    this.isFavourite = false;
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem(`favorites_${userUid}`) || '[]'
    ).filter((movie) => movie.id != this.movie.id);
    localStorage.setItem(
      `favorites_${userUid}`,
      JSON.stringify([...favorites])
    );
    this.sweetAlert.addFav('Film removed Successful');
  } // ------------------ end removeFavorite

}
