import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { EventBusService } from 'src/app/services/event-bus.service';
import { MovieResult } from '../movie-model';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-most-watched-movie-list',
  templateUrl: './most-watched-movie-list.component.html',
  styleUrls: ['./most-watched-movie-list.component.css'],
})
export class MostWatchedMovieListComponent implements OnInit, OnDestroy {
  movies: MovieResult[] = [];

  unsubscribe$:Subject<number> = new Subject<number>();

  page: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieApi: MovieApiService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.mostWatchedMovies();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(-1);
    this.unsubscribe$.unsubscribe();
  }

  mostWatchedMovies() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          if (params['page']) {
            if (
              parseInt(params['page']) > 200 ||
              !parseInt(params['page'].split('').reverse().join(''))
            ) {
              throw 'page-not-found';
            } else {
              this.page = params['page'];
              return this.movieApi.getMovieListByPageName(this.page);
            }
          }
          return this.movieApi.getMovieListByPageName(this.page);
        })
      )
      .subscribe(
        (movieData) => {
          this.movies = movieData.results.filter(
            (movie) => movie.poster_path && movie.overview && movie.title
          );
          this.eventBusService.setPage(this.page);
        },
        (error) => {
          this.router.navigate([error]);
        }
      );
  }

  pagination(page: number) {
    this.page = page;
    this.router.navigate(['/movie-list'], {
      queryParams: {
        page,
      },
      relativeTo: this.route,
    });
    this.movieApi
      .getMovieListByPageName(page)
      .subscribe((data) => (this.movies = data.results));
  }

  goToDetails(movieId: number) {
    this.router.navigate([`movie/${movieId}`]);
  }

  scrollTop(){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }


}
