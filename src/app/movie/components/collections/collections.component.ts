import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { SideBarCollectionDisplay } from '../../movie-model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  collections$: Observable<SideBarCollectionDisplay[]> = this.store.select(
    MovieSelector.selectSideBarCollections
  );

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MovieActions.getSideBarCollection());
  }

  goToCollectionDetail(collection_id: number) {
    this.router.navigate([`movie-list/collection/${collection_id}`]);
  }
}
