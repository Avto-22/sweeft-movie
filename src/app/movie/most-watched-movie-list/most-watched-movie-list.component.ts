import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MovieResult } from '../movie-model';
import { MostWatchedFacadeService } from './services/most-watched-facade.service';

@Component({
  selector: 'app-most-watched-movie-list',
  templateUrl: './most-watched-movie-list.component.html',
  styleUrls: ['./most-watched-movie-list.component.css'],
})
export class MostWatchedMovieListComponent implements OnInit {
  movies$: Observable<MovieResult[]>;

  unsubscribe$:Subject<number> = new Subject<number>();

  constructor(
    public facadeService:MostWatchedFacadeService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.facadeService.mostWatchedMovies$;
  }

}
