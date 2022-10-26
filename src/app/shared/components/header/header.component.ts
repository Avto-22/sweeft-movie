import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBusService } from 'src/app/services/event-bus.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieResult } from 'src/app/movie/movie-model';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() movieId: EventEmitter<number> = new EventEmitter<number>();

  unsubscribe: Subject<number> = new Subject<number>();
  findedMovies$: Observable<MovieResult[]>;
  isMovieFinded: Observable<boolean> = this.store.select(MovieSelector.selectIsMovieFinded);
  isBurgerOpen: boolean = false;

  @ViewChild('form', { static: true }) form: FormGroup;
  @ViewChild('mostWatch', { static: true }) mostWatchEl: ElementRef;
  @ViewChild('favourite', { static: true }) favouriteEl: ElementRef;

  @ViewChild('header', { static: true }) headerDiv: ElementRef;
  @ViewChild('card', { static: false }) cardDiv?: ElementRef;
  @ViewChild('search', { static: true }) searchDiv: ElementRef;

  constructor(
    private eventBusService: EventBusService,
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        this.search(value.movieName);
      });
  }

  ngAfterViewInit(): void {
    this.renderer.listen(window, 'click', (event) => {
      this.outsideHeader(event);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(-1);
    this.unsubscribe.unsubscribe();
  }

  outsideHeader(event: Event) {
    if (this.cardDiv) {
      if (!this.headerDiv?.nativeElement.contains(event.target)) {
        this.renderer.addClass(this.cardDiv?.nativeElement, 'close-search');
      } else if (this.searchDiv?.nativeElement.contains(event.target)) {
        this.renderer.removeClass(this.cardDiv?.nativeElement, 'close-search');
      }
    }
  }

  search(movieName: string) {
    if (movieName) {
      this.store.dispatch(MovieActions.getSearchedMovies({ movieName }));
      this.findedMovies$ = this.store.select(MovieSelector.selectFindedMovies);
    } else {
      this.findedMovies$ = of([]);
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
    this.store.dispatch(MovieActions.clearSearchedMovies());
  }

  goToDetails(movieId: number) {
    if (this.route.snapshot.params['id']) {
      this.movieId.emit(movieId);
    }
    this.router.navigate([`movie-list/movie/${movieId}`]);
  }

  goToFavourite() {
    this.router.navigate(['/movie-list/favourite-movie']);
  }

  goToCollections(){
    this.router.navigate(['movie-list/collections']);
  }

  burger() {
    this.isBurgerOpen = !this.isBurgerOpen;
  }

  logOut() {
    this.authService.signOut();
  }
  
}
