import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { CollectionApiResponse } from '../../movie-model';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  collectionId:number;
  collection$: Observable<CollectionApiResponse> = this.store.select(MovieSelector.selectCollection);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.collectionId = this.activatedRoute.snapshot.params['collection_id'];
    this.store.dispatch(MovieActions.getCollectionDetail({collectionId: this.collectionId}));
  }

}
