import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieActions } from '../store/actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  activeUrl!: string;

  constructor(private store: Store) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#1e81b0';
    document.body.style.backgroundImage = 'none';
  }

  ngOnDestroy(): void {
    this.store.dispatch(MovieActions.clearAllState());
  }
}
