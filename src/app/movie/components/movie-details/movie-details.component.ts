import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '../../movie-model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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

  loading$: Observable<boolean> = this.store.select(MovieSelector.selectLoading);

  movie$:Observable<MovieDetail> = this.store.select(MovieSelector.selectMovieDetail);

  arr: MovieDetail[] = [];

  @ViewChild('cast') cast: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    public facadeService:MovieDetailsFacadeService,
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#1e81b0';
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.store.dispatch(MovieActions.getMovieDetals({id: 0, uid:''}))
  }

  async getMovie(){
    let userUid:string;
     await this.authService?.getUserUid().then(res=>{
      userUid = res
    });

    this.activatedRoute.paramMap
    .pipe(
      map((params) => {
         this.store.dispatch(MovieActions.getMovieDetals({id:parseInt(params.get('id')), uid: userUid}))
      }),
    ).subscribe();
  }

  next() {
    this.cast.nativeElement.scrollLeft += 200;
  }

  back() {
    this.cast.nativeElement.scrollLeft -= 200;
  }

}
