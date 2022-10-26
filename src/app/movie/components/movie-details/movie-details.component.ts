import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '../../movie-model';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { utility } from './utility';
import { MovieDetailsFacadeService } from './services/movie-details-facade.service';
import { Store } from '@ngrx/store';
import { MovieSelector } from 'src/app/store/selectors';
import { MovieActions } from 'src/app/store/actions';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  utility = utility;

  movie$: Observable<MovieDetail> = this.store.select(
    MovieSelector.selectMovieDetail
  );

  isFavMovie$: Observable<boolean> = this.store.select(
    MovieSelector.selectIsFavMovie
  );

  isMovieNotFound$: Observable<boolean> = this.store.select(
    MovieSelector.selectIsMovieNotFound
  );

  movieNotFoundText$: Observable<string> = this.store.select(
    MovieSelector.selectMovieNotFoundText
  );

  unsubscribe$: Subject<number> = new Subject<number>();

  @ViewChild('cast') cast: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    public facadeService: MovieDetailsFacadeService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    document.body.style.backgroundColor = 'black';
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.store.dispatch(MovieActions.clearAllState());
    this.unsubscribe$.next(-1);
    this.unsubscribe$.unsubscribe();
  }

  async getMovie() {
    let userUid: string;
    await this.authService?.getUserUid().then((res) => {
      userUid = res;
    });

    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => {
          this.store.dispatch(
            MovieActions.getMovieDetals({
              id: parseInt(params.get('id')),
              uid: userUid,
            })
          );
        })
      )
      .subscribe();
  }

  next() {
    this.cast.nativeElement.scrollLeft += 200;
  }

  back() {
    this.cast.nativeElement.scrollLeft -= 200;
  }
}
