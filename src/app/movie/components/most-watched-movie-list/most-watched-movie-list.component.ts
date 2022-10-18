import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { MovieResult } from '../../movie-model';
import { MostWatchedFacadeService } from './services/most-watched-facade.service';

@Component({
  selector: 'app-most-watched-movie-list',
  templateUrl: './most-watched-movie-list.component.html',
  styleUrls: ['./most-watched-movie-list.component.css'],
})
export class MostWatchedMovieListComponent implements OnInit {
  movies$: Observable<MovieResult[]> = this.store.select(MovieSelector.selectMostWatchedMovies);
  page$: Observable<number> = this.store.select(MovieSelector.selectPage);

  unsubscribe$:Subject<number> = new Subject<number>();

  constructor(
    public facadeService:MostWatchedFacadeService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MovieActions.getMostWatchedMovies());
  }

}
