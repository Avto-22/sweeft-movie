import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieResult, MovieDeatil } from '../movie-model';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie!: MovieDeatil;
  isMovieNotFound: boolean;
  isTrailerPlayed: boolean;

  isFavourite: boolean;
  errorText: string;

  favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  @ViewChild('cast') cast: ElementRef;


  unsubscribe$: Subject<number> = new Subject<number>();

  constructor(
    private movieApi: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private authService: AuthService,
    private renderer:Renderer2
  ) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#1e81b0';
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((movieId) => {
        if (movieId) {
          this.getFullInfo(+movieId);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(-1);
    this.unsubscribe$.unsubscribe();
  }

  getFullInfo(id?: number) {
    let userUid = this.authService.getUserUid();
    let movieId: number;
    let favMovies: MovieResult[] = JSON.parse(
      localStorage.getItem(`favorites_${userUid}`) || '[]'
    );
    if (id) {
      movieId = id;
    } else {
      movieId = this.activatedRoute.snapshot.params['id'];
    }
    this.movieApi
      .getMovieById(movieId)
      .pipe(
        map((movie) => {
          /* api-დან წამოღებული ფილმების შემოწმება არის თუ არა რომელიმე  უკვე მომხმარებლის მიერ ფავორიტი, და თუ არის დაამატებს ობიექტს შესაბამის პროპერთის true მნიშვნელობით,
          რასაც გამოვიყენებ შემდეგ დეტალების გვედზე ფავორიტების დამატების და წაშლის ღილაკების გამოსაჩენად*/
          for (let i = 0; i < favMovies.length; i++) {
            if (movie.id == favMovies[i].id) {
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
            catchError(()=> of({
              cast: []
            })),
            switchMap((cast) => {
              return this.movieApi.getMovieTrailer(movie.id).pipe(
                catchError(() =>
                  of({
                   results:[]
                  })
                ),
                switchMap((trailer_response) => {
                  return of({
                    ...movie,
                    casts: cast.cast.filter((data) => data.profile_path),
                    trailer_url:  trailer_response.results.length ? 'https://www.youtube.com/embed/' + trailer_response.results[0].key : '',
                  });
                })
              );
            })
          );
        }),
        catchError((error) => {
          throw 'movie not found';
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (movie) => {
          this.movie = movie;
          this.isFavourite = Boolean(this.movie.isFavorite);
        },

        (error) => {
          this.isMovieNotFound = true;
          this.errorText = error;
        }
      );
  }

  addFavorite() {
    let userUid = this.authService.getUserUid();
    this.isFavourite = true;
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem(`favorites_${userUid}`) || '[]'
    );

    localStorage.setItem(
      `favorites_${userUid}`,
      JSON.stringify([this.movie, ...favorites])
    );
    this.sweetAlert.addFav('Film added Successful');
  }

  removeFavourite() {
    let userUid = this.authService.getUserUid();
    this.isFavourite = false;
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem(`favorites_${userUid}`) || '[]'
    ).filter((movie) => movie.id != this.movie.id);
    localStorage.setItem(
      `favorites_${userUid}`,
      JSON.stringify([...favorites])
    );
    this.sweetAlert.addFav('Film removed Successful');
  }

  next() {
    this.cast.nativeElement.scrollLeft += 200;
  }

  back() {
    this.cast.nativeElement.scrollLeft -= 200;
  }

  playTrailer() {
    this.isTrailerPlayed = true;
    window.onscroll = function () {
      // disable window scroll
      window.scrollTo(
        window.pageYOffset || document.documentElement.scrollTop,
        window.pageXOffset || document.documentElement.scrollLeft
      );
    };
  }

  closeTrailer() {
    this.isTrailerPlayed = false;
    window.onscroll = function () {}; // undisable window scroll
  }

}
