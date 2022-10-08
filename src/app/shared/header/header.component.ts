import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBusService } from 'src/app/services/event-bus.service';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';
import { Genres, MovieResult } from 'src/app/movie/movie-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  @Output() movieId: EventEmitter<number> = new EventEmitter<number>();

  activeUrl!: string;
  page: Observable<number>;
  genres: Genres;
  unsubscribe: Subject<number> = new Subject<number>();
  findedMovies: MovieResult[] = [];
  isMovieFinded: boolean = true;
  isBurgerOpen:boolean = false;

  @ViewChild('form', { static: true }) form: FormGroup;
  @ViewChild('mostWatch', { static: true }) mostWatchEl: ElementRef;
  @ViewChild('favourite', { static: true }) favouriteEl: ElementRef;

  @ViewChild('header', { static: true }) headerDiv: ElementRef;
  @ViewChild('card', { static: true }) cardDiv: ElementRef;
  @ViewChild('search', { static: false }) searchDiv: ElementRef;

  constructor(
    private eventBusService: EventBusService,
    public router: Router,
    private authService: AuthService,
    private movieApi: MovieApiService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.outsideHeader();
    this.getGenre();

    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(value=>{
      this.search(value.movieName)
    });

  }    

  ngDoCheck(): void {
    of(this.form?.value.movieName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if (!value) {
          this.findedMovies = [];
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(-1);
    this.unsubscribe.unsubscribe();
  }

  outsideHeader() {
    this.renderer.listen(window, 'click', (event) => {
      if (
        !this.headerDiv.nativeElement.contains(event.target) &&
        this.cardDiv.nativeElement.offsetHeight > 10
      ) {
        this.renderer.addClass(this.cardDiv.nativeElement, 'close-search');
      } else if (this.searchDiv.nativeElement.contains(event.target)) {
        this.renderer.removeClass(this.cardDiv.nativeElement, 'close-search');
      }
    });
  }

  search(movieName: string) {
    if (movieName) {
      this.movieApi
        .searchMovieByName(movieName)
        .pipe(
          switchMap((data) => {
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
            throw 'movie not found';
          }),
          takeUntil(this.unsubscribe)
        )
        .subscribe(
          (res) => {
            this.isMovieFinded = true;
            this.findedMovies = res;
          },
          (error) => {
            this.isMovieFinded = false;
            this.findedMovies = [];
          }
        );
    } else {
      this.findedMovies = [];
    }
  }

  goToMostWatched() {
    if (this.eventBusService.page) {
      this.router.navigate(['movie-list'], {
        queryParams: {
          page: this.eventBusService.page,
        },
      });
    } else {
      this.router.navigate(['movie-list']);
    }
  }

  closeSearch() {
    this.form.reset();
    this.findedMovies = [];
  }

  goToDetails(movieId: number) {
    if (this.route.snapshot.params['id']) {
      this.movieId.emit(movieId);
    }
    this.router.navigate([`movie-list/movie/${movieId}`]);
  }

  logOut() {
    this.authService.signOut();
  }

  goToFavourite() {
    this.router.navigate(['/movie-list/favourite-movie']);
  }

  getGenre() {
    this.movieApi
      .getMovieGenres()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((genres) => (this.genres = genres));
  }

  burger(){
    this.isBurgerOpen = !this.isBurgerOpen;
  }
  
}
