import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { Genre, Movie, MovieResult } from '../../../movie/movie-model';

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

  genres$: Observable<Genre[]> = this.store.select(MovieSelector.selectGenres);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
   this.store.dispatch(MovieActions.getGenres());
  }

  pagination(page: number) {
    this.page = page;
    this.router.navigate(['/movie-list'], {
      queryParams: {
        page,
      },
      relativeTo: this.route,
    });
  }

  goToDetails(movieId: number) {
    this.clearSearch.emit();
    this.router.navigate([`/movie-list/movie/${movieId}`]);
  }
}
