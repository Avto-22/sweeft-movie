import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MovieActions } from 'src/app/store/actions';
import { Genre, Movie, MovieResult } from '../../../movie/movie-model';
import { MovieApiService } from '../../../movie/services/movie-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() MostWatchedmovies: MovieResult[] = [];
  @Input() FavMovies: Movie[] = [];
  @Input() SearchMovies: MovieResult[] = [];
  @Input() page: number = 1;
  @Input() isMostWatchedMovie!: boolean;
  @Input() isFavMovies: boolean;
  @Input() isSearchmovies: boolean;

  @Output() clearSearch: EventEmitter<void> = new EventEmitter<void>();

  genres: Genre[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieApi: MovieApiService,
    // private store:Store
  ) {}

  ngOnInit(): void {
    this.getGenre();
  }

  getGenre() {
    this.movieApi
      .getMovieGenres()
      .subscribe((res) => (this.genres = res.genres));
  }

  pagination(page: number) {
    this.page = page;
    this.router.navigate(['/movie-list'], {
      queryParams: {
        page,
      },
      relativeTo: this.route,
    });
    // this.store.dispatch(MovieActions.getMostWatchedMovies())
    // this.movieApi
    //   .getMovieListByPageName(page)
    //   .subscribe((data) => (this.MostWatchedmovies = data.results));
  }

  goToDetails(movieId: number) {
    this.clearSearch.emit();
    this.router.navigate([`/movie-list/movie/${movieId}`]);
  }
}
